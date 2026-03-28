import { Link } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15UfOU_7siIOqSZdgMMnLsE1wixHT5eXbI_g28h72mTk/edit?gid=0#gid=0";

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-amber-400 font-black text-xl tracking-tight">
            <BookOpen className="w-5 h-5" />
            <span>Sheet Blog</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-400 hover:text-amber-400 transition-colors font-mono text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors font-mono text-sm uppercase tracking-wider"
            >
              Spreadsheet
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-amber-400 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden bg-gray-950 border-b border-gray-800 transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-400 hover:text-amber-400 font-mono text-sm uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-gray-400 hover:text-amber-400 font-mono text-sm uppercase tracking-wider"
          >
            Spreadsheet
          </a>
        </div>
      </div>
    </nav>
  );
}
