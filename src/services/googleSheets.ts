export interface GPost {
  id: string;
  date: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  author: string;
}

const SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || "AIzaSyCOqjPQ25AD-pT0-2tsEYuD2uv3z77nM6M",
  spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID || "15UfOU_7siIOqSZdgMMnLsE1wixHT5eXbI_g28h72mTk",
  sheetName: import.meta.env.VITE_SHEET_NAME || "Sheet1",
};

const MOCK_POSTS: GPost[] = [
  {
    id: "1",
    date: "2024-03-20",
    slug: "selamat-datang-di-blog-kami",
    title: "Selamat Datang di Blog Kami",
    content: "Ini adalah postingan pertama di blog kami yang menggunakan Google Sheets sebagai CMS.\n\nAnda bisa menambahkan postingan baru hanya dengan mengisi baris baru di spreadsheet.",
    excerpt: "Postingan pertama kami yang menjelaskan cara kerja blog bertenaga Google Sheets ini.",
    image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    author: "Admin"
  },
  {
    id: "2",
    date: "2024-03-22",
    slug: "tips-menulis-konten-berkualitas",
    title: "Tips Menulis Konten Berkualitas",
    content: "Menulis konten yang menarik memerlukan latihan dan strategi.\n1. Kenali audiens Anda.\n2. Gunakan judul yang memikat.\n3. Berikan nilai tambah bagi pembaca.",
    excerpt: "Pelajari cara membuat konten yang menarik dan bermanfaat bagi pembaca blog Anda.",
    image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop",
    author: "Jules"
  },
];

export type FetchError = {
  type: "config_missing" | "api_blocked" | "not_public" | "parse_error" | "unknown";
  message: string;
  detail?: string;
};

function parseRows(rows: any[][]): GPost[] {
  return rows
    .filter((row) => row && row.length >= 2 && row[1])
    .map((row) => ({
      id: String(row[0] || ""),
      title: String(row[1] || ""),
      slug: String(row[2] || ""),
      date: String(row[3] || ""),
      author: String(row[4] || ""),
      image_url: String(row[5] || ""),
      excerpt: String(row[6] || ""),
      content: String(row[7] || ""),
    }));
}

export const googleSheetsService = {
  async getPosts(): Promise<GPost[]> {
    const { apiKey, spreadsheetId, sheetName } = SHEETS_CONFIG;

    if (!spreadsheetId) {
      console.warn("Spreadsheet ID missing, using mock data.");
      return MOCK_POSTS;
    }

    const range = `${sheetName}!A2:H100`;

    // 1. Try Google Sheets API v4
    if (apiKey) {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
        console.log("Fetching via Sheets API v4...");
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const rows = data.values || [];
          if (rows.length > 0) {
            console.log(`Sheets API v4: ${rows.length} rows loaded.`);
            return parseRows(rows);
          }
        } else {
          console.warn(`Sheets API v4 failed: ${res.status} ${res.statusText}`);
        }
      } catch (e) {
        console.warn("Sheets API v4 error:", e);
      }
    }

    // 2. Fallback: GViz public endpoint
    try {
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
      console.log("Fetching via GViz fallback...");
      const res = await fetch(gvizUrl);
      if (!res.ok) throw new Error(`GViz fetch failed: ${res.status}`);

      const text = await res.text();
      const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const jsonData = JSON.parse(jsonText);
      const gvizRows = jsonData.table.rows || [];

      if (gvizRows.length === 0) return MOCK_POSTS;

      console.log(`GViz: ${gvizRows.length} rows loaded.`);
      return gvizRows.map((row: any) => {
        const c = row.c;
        return {
          id: String(c[0]?.v ?? ""),
          title: String(c[1]?.v ?? ""),
          slug: String(c[2]?.v ?? ""),
          date: String(c[3]?.f ?? c[3]?.v ?? ""),
          author: String(c[4]?.v ?? ""),
          image_url: String(c[5]?.v ?? ""),
          excerpt: String(c[6]?.v ?? ""),
          content: String(c[7]?.v ?? ""),
        };
      });
    } catch (e) {
      console.error("GViz fallback error:", e);
    }

    // 3. Final fallback: mock data
    console.warn("All fetch methods failed, using mock data.");
    return MOCK_POSTS;
  },

  async getPostBySlug(slug: string): Promise<GPost | null> {
    const posts = await this.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },
};
