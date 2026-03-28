export default function Footer() {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15UfOU_7siIOqSZdgMMnLsE1wixHT5eXbI_g28h72mTk/edit?gid=0#gid=0";

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-sm font-mono">
            © {new Date().getFullYear()} Sheet Blog
          </div>
          <div className="flex gap-6 text-gray-600 text-sm font-mono">
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/70 hover:text-amber-400 transition-colors"
            >
              Source Spreadsheet
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
