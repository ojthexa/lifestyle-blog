export default function Footer() {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15UfOU_7siIOqSZdgMMnLsE1wixHT5eXbI_g28h72mTk/edit?gid=0#gid=0";

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sheet Blog. All rights reserved.
          </div>
          <div className="flex gap-6 text-gray-400 text-sm font-medium">
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Source Spreadsheet
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
