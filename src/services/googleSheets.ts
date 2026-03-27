// @ts-ignore
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
// @ts-ignore
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
// @ts-ignore
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || "Sheet1";

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

export const googleSheetsService = {
  async getPosts(): Promise<GPost[]> {
    if (!API_KEY || !SPREADSHEET_ID) {
      console.warn("Google Sheets API Key or Spreadsheet ID is missing.");
      return [];
    }

    const range = `${SHEET_NAME}!A2:H100`; // Assuming headers are in row 1
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch from Google Sheets");
      
      const data = await response.json();
      const rows = data.values || [];

      return rows.map((row: any[]) => ({
        id: row[0] || "",
        date: row[1] || "",
        slug: row[2] || "",
        title: row[3] || "",
        content: row[4] || "",
        excerpt: row[5] || "",
        image_url: row[6] || "",
        author: row[7] || "",
      }));
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
      throw error;
    }
  },

  async getPostBySlug(slug: string): Promise<GPost | null> {
    const posts = await this.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },
};
