
Ringkasan masalah:
- Dari console: `Google Sheets API Key or Spreadsheet ID is missing`.
- Snapshot network tidak menunjukkan request ke endpoint Google Sheets, jadi proses berhenti sebelum fetch data.
- Di kode repo saat ini (`src/services/googleSheets.ts`) pesan log itu tidak ada, artinya preview kemungkinan masih menjalankan bundle lama atau konfigurasi runtime yang belum membawa `VITE_*`.
- File `.env` tidak ada di root, sementara kode bergantung ke `import.meta.env.VITE_*`, jadi nilai bisa kosong di preview/publish.

Rencana implementasi:
1. Stabilkan sumber konfigurasi spreadsheet
   - Di `src/services/googleSheets.ts`, tambahkan default config (API key, spreadsheet ID, sheet name) dari data yang Anda beri.
   - Tetap support `import.meta.env.VITE_*` sebagai override kalau nanti diset.

2. Perkuat alur pengambilan data
   - Urutan fetch:
     1) Google Sheets API v4 (dengan API key),
     2) fallback GViz public,
     3) fallback mock data hanya jika keduanya gagal.
   - Tambahkan validasi/normalisasi row agar data kosong tidak merusak render.

3. Buat error jadi lebih jelas
   - Di `src/pages/Blog.tsx`, ganti pesan error generik jadi kategoris:
     - config tidak ada,
     - 403 API key blocked,
     - spreadsheet belum public/publish,
     - parsing gagal.
   - Sertakan detail teknis ringan untuk debugging (status code + endpoint).

4. Pastikan tampilan terbaru tetap aktif
   - Verifikasi `/` tetap memakai Home maskulin terbaru.
   - Samakan tema `Blog`, `Navbar`, dan `Footer` agar konsisten dengan Home terbaru (sekarang masih dominan gaya lama/terang).

5. Validasi end-to-end
   - Uji `/blog` menampilkan konten asli dari spreadsheet.
   - Uji detail `/blog/:slug`.
   - Uji preview URL dan published URL agar tidak ada mismatch bundle lama vs kode terbaru.

Detail teknis:
- File utama: `src/services/googleSheets.ts` (resolver config + parser API/GViz + error typing).
- File UI: `src/pages/Blog.tsx`, `src/pages/PostDetail.tsx` (error state yang lebih informatif).
- Konsistensi UI: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, opsional `src/App.tsx` untuk background global.

Output yang diharapkan:
- Blog tidak lagi gagal karena env kosong.
- Konten spreadsheet tampil stabil.
- Jika ada gangguan API/permission, penyebabnya langsung jelas.
- Home dan Blog konsisten dengan tampilan terbaru.
<lov-actions>
<lov-suggestion message="Test the blog flow end-to-end on preview and published URLs: open /blog, verify posts load from the spreadsheet, and open one post detail by slug.">Verify that it works</lov-suggestion>
<lov-suggestion message="Implement robust Google Sheets config fallback in src/services/googleSheets.ts using your provided API key, spreadsheet ID, and sheet name as defaults when VITE env values are missing.">Stabilize Sheets Config</lov-suggestion>
<lov-suggestion message="Improve Blog error handling to show specific causes (missing config, 403 API blocked, public access issue, parsing failure) instead of one generic message.">Improve Error Messages</lov-suggestion>
<lov-suggestion message="Make Blog, Navbar, and Footer fully consistent with the latest masculine dark theme used on Home while keeping spreadsheet data rendering intact.">Sync Latest Theme</lov-suggestion>
</lov-actions>
