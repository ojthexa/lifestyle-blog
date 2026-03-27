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
      } catch (err) {
        setError("Gagal memuat postingan dari Google Sheets. Pastikan API Key dan Spreadsheet ID sudah benar.");
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-center">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-gray-50 text-gray-600 rounded-2xl border border-gray-100 text-center">
        <p className="font-medium">Belum ada postingan yang ditemukan di Spreadsheet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Blog Spreadsheet</h1>
        <p className="text-gray-600 text-lg">Konten yang dikelola langsung dari Google Sheets.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            {post.image_url && (
              <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </Link>
            )}
            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
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
                <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-indigo-600 font-semibold text-sm hover:underline pt-2"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
