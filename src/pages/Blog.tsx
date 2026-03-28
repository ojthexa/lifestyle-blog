import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { googleSheetsService, GPost } from "@/src/services/googleSheets";
import { Loader2, Calendar, User } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState<GPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await googleSheetsService.getPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err?.message || "Gagal memuat postingan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, "MMM d, yyyy") : dateStr;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-950">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-950 min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl p-8 bg-red-950/50 text-red-300 rounded border border-red-800 text-center">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gray-950 min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl p-8 bg-gray-900 text-gray-400 rounded border border-gray-800 text-center">
          <p className="font-medium">Belum ada postingan yang ditemukan di Spreadsheet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="space-y-3">
          <p className="text-amber-400 font-mono text-sm uppercase tracking-widest">Blog</p>
          <h1 className="text-4xl font-black tracking-tight text-gray-100">Postingan Terbaru</h1>
          <p className="text-gray-500 text-lg">Konten langsung dari Google Sheets.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800">
          {posts.map((post, index) => (
            <motion.article
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-gray-950 p-0 flex flex-col"
            >
              {post.image_url && (
                <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-80 hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              )}
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex items-center gap-4 text-xs text-gray-600 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  {post.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  )}
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-bold text-gray-100 hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors uppercase tracking-wider pt-2"
                >
                  Baca →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
