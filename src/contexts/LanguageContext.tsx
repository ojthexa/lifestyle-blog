import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "id" | "en";

const translations = {
  id: {
    home: "Beranda",
    blog: "Blog",
    experimentalProject: "Proyek Eksperimental",
    heroTitle1: "Blog Engine",
    heroTitle2: "Spreadsheet",
    heroTitle3: "Powered.",
    heroDesc: "Tulis konten di Google Sheets, langsung tayang di website. Tanpa database rumit, tanpa CMS berat.",
    readBlog: "Baca Blog",
    howItWorks: "Cara Kerja",
    howItWorksTitle: "Simple. Brutal. Efektif.",
    step1Title: "Tulis di Spreadsheet",
    step1Desc: "Buka Google Sheets, isi kolom judul, konten, gambar. Selesai.",
    step2Title: "Auto Fetch API",
    step2Desc: "Website otomatis mengambil data terbaru dari Sheets API setiap kali diakses.",
    step3Title: "Tampil di Web",
    step3Desc: "Konten langsung tampil dengan desain modern tanpa deploy ulang.",
    readyToStart: "Siap Mulai?",
    readyDesc: "Lihat postingan yang sudah ada atau mulai tambahkan konten baru melalui Spreadsheet.",
    viewBlog: "Lihat Blog",
    latestPosts: "Postingan Terbaru",
    blogSubtitle: "Konten langsung dari Google Sheets.",
    read: "Baca",
    back: "Kembali",
    noPosts: "Belum ada postingan yang ditemukan.",
    previous: "Sebelumnya",
    next: "Selanjutnya",
    page: "Halaman",
    of: "dari",
  },
  en: {
    home: "Home",
    blog: "Blog",
    experimentalProject: "Experimental Project",
    heroTitle1: "Blog Engine",
    heroTitle2: "Spreadsheet",
    heroTitle3: "Powered.",
    heroDesc: "Write content in Google Sheets, instantly live on the website. No complex database, no heavy CMS.",
    readBlog: "Read Blog",
    howItWorks: "How It Works",
    howItWorksTitle: "Simple. Brutal. Effective.",
    step1Title: "Write in Spreadsheet",
    step1Desc: "Open Google Sheets, fill in title, content, image columns. Done.",
    step2Title: "Auto Fetch API",
    step2Desc: "Website automatically fetches the latest data from Sheets API on every visit.",
    step3Title: "Display on Web",
    step3Desc: "Content appears instantly with modern design without redeployment.",
    readyToStart: "Ready to Start?",
    readyDesc: "View existing posts or start adding new content through the Spreadsheet.",
    viewBlog: "View Blog",
    latestPosts: "Latest Posts",
    blogSubtitle: "Content straight from Google Sheets.",
    read: "Read",
    back: "Back",
    noPosts: "No posts found.",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
  },
};

type Translations = typeof translations.id;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
  t: translations.id,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" || saved === "id") ? saved : "id";
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
