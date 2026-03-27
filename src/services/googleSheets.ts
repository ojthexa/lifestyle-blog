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

const MOCK_POSTS: GPost[] = [
  {
    id: "1",
    date: "2024-03-20",
    slug: "selamat-datang-di-blog-kami",
    title: "Selamat Datang di Blog Kami",
    content: "Ini adalah postingan pertama di blog kami yang menggunakan Google Sheets sebagai CMS. Kami sangat senang bisa berbagi informasi dengan Anda semua. Google Sheets memudahkan kita untuk mengelola konten tanpa harus berurusan dengan database yang rumit.\n\nAnda bisa menambahkan postingan baru hanya dengan mengisi baris baru di spreadsheet yang telah ditentukan.",
    excerpt: "Postingan pertama kami yang menjelaskan cara kerja blog bertenaga Google Sheets ini.",
    image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    author: "Admin"
  },
  {
    id: "2",
    date: "2024-03-22",
    slug: "tips-menulis-konten-berkualitas",
    title: "Tips Menulis Konten Berkualitas",
    content: "Menulis konten yang menarik memerlukan latihan dan strategi. Berikut adalah beberapa tips:\n1. Kenali audiens Anda.\n2. Gunakan judul yang memikat.\n3. Berikan nilai tambah bagi pembaca.\n4. Gunakan gambar pendukung yang relevan.\n\nDengan mengikuti tips ini, blog Anda akan lebih disukai oleh pembaca.",
    excerpt: "Pelajari cara membuat konten yang menarik dan bermanfaat bagi pembaca blog Anda.",
    image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop",
    author: "Jules"
  },
  {
    id: "3",
    date: "2024-03-25",
    slug: "teknologi-dibalik-blog-ini",
    title: "Teknologi di Balik Blog Ini",
    content: "Blog ini dibangun menggunakan teknologi modern:\n- React untuk library UI.\n- Vite sebagai build tool yang super cepat.\n- Tailwind CSS untuk styling yang fleksibel.\n- Google Sheets API sebagai sumber data (CMS).\n- Lucide React untuk ikon yang cantik.\n\nKombinasi ini menghasilkan website yang cepat, responsif, dan mudah dikelola.",
    excerpt: "Mengenal tumpukan teknologi (tech stack) yang digunakan untuk membangun blog modern ini.",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    author: "Dev Team"
  }
];

export const googleSheetsService = {
  async getPosts(): Promise<GPost[]> {
    const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
    const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || "Sheet1";

    if (!SPREADSHEET_ID) {
      console.warn("Using mock data because Spreadsheet ID is missing.");
      return MOCK_POSTS;
    }

    const range = `${SHEET_NAME}!A2:H100`;
    const standardUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    const fallbackUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

    try {
      // 1. Try standard API if key is available
      if (API_KEY) {
        const response = await fetch(standardUrl);
        if (response.ok) {
          const data = await response.json();
          const rows = data.values || [];
          if (rows.length > 0) {
            return rows.map((row: any[]) => ({
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
        }
      }

      // 2. Fallback to GViz API (Public Data)
      console.log("Attempting fallback to GViz API...");
      const fallbackResponse = await fetch(fallbackUrl);
      if (!fallbackResponse.ok) throw new Error("Fallback fetch failed");

      const text = await fallbackResponse.text();
      // Remove the prefix (google.visualization.Query.setResponse() and the closing ;)
      const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
      const jsonData = JSON.parse(jsonText);
      const rows = jsonData.table.rows || [];

      if (rows.length === 0) return MOCK_POSTS;

      return rows.map((row: any) => {
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
    } catch (error) {
      console.error("Error fetching Google Sheets data, using mock data:", error);
      return MOCK_POSTS;
    }
  },

  async getPostBySlug(slug: string): Promise<GPost | null> {
    const posts = await this.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },
};
