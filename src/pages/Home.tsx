import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Zap, Shield } from "lucide-react";

export default function Home() {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15UfOU_7siIOqSZdgMMnLsE1wixHT5eXbI_g28h72mTk/edit?gid=0#gid=0";

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-xs font-mono uppercase tracking-widest">
              Experimental Project
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Blog Engine
              <br />
              <span className="text-amber-400">Spreadsheet</span>
              <br />
              Powered.
            </h1>
            <p className="max-w-lg text-gray-400 text-lg leading-relaxed">
              Tulis konten di Google Sheets, langsung tayang di website. Tanpa database rumit, tanpa CMS berat.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/blog"
                className="bg-amber-400 text-gray-950 px-8 py-4 font-bold hover:bg-amber-300 transition-colors flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Baca Blog <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-700 text-gray-300 px-8 py-4 font-bold hover:border-gray-500 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                Google Sheets
              </a>
            </div>
          </motion.div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="space-y-3">
              <p className="text-amber-400 font-mono text-sm uppercase tracking-widest">Cara Kerja</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Simple. Brutal. Efektif.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-gray-800">
              <FeatureCard
                icon={<Database className="w-6 h-6 text-amber-400" />}
                step="01"
                title="Tulis di Spreadsheet"
                description="Buka Google Sheets, isi kolom judul, konten, gambar. Selesai."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-amber-400" />}
                step="02"
                title="Auto Fetch API"
                description="Website otomatis mengambil data terbaru dari Sheets API setiap kali diakses."
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-amber-400" />}
                step="03"
                title="Tampil di Web"
                description="Konten langsung tampil dengan desain modern tanpa deploy ulang."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Siap Mulai?</h2>
          <p className="text-gray-400 max-w-md mx-auto">Lihat postingan yang sudah ada atau mulai tambahkan konten baru melalui Spreadsheet.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-amber-400 text-gray-950 px-10 py-4 font-bold hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            Lihat Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, step, title, description }: { icon: ReactNode; step: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-950 p-10 space-y-4"
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-gray-700 font-mono text-sm">{step}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-100">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
