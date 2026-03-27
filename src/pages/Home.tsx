import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
              React <span className="text-indigo-600">Spreadsheet</span> Blog
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              A modern, high-performance blog framework built with React and powered by Google Sheets as a database.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/blog"
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
              >
                Read Blog <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://developer.wordpress.org/rest-api/"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all"
              >
                WP API Docs
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-amber-500" />}
            title="Fast Performance"
            description="Built with React and Vite for lightning-fast page loads and smooth transitions."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-blue-500" />}
            title="Google Sheets CMS"
            description="Use Google Sheets as your content backend for easy management without a complex dashboard."
          />
          <FeatureCard
            icon={<Layout className="w-8 h-8 text-indigo-500" />}
            title="Modern UI"
            description="Styled with Tailwind CSS for a clean, professional, and responsive design."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4"
    >
      <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
