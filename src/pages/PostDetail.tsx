import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { googleSheetsService, GPost } from "@/src/services/googleSheets";
import { Loader2, Calendar, User, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<GPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const data = await googleSheetsService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError("Postingan tidak ditemukan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, "MMMM d, yyyy") : dateStr;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-950">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gray-950 min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-400 font-medium">{error || "Postingan tidak ditemukan"}</p>
          <Link to="/blog" className="inline-block text-amber-400 hover:text-amber-300 font-bold text-sm uppercase tracking-wider">
            ← Kembali ke Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-colors mb-10 font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <article className="space-y-8">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-100 leading-[0.95]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-500 font-mono text-sm border-b border-gray-800 pb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>
          </header>

          {post.image_url && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed
              prose-headings:text-gray-100 prose-headings:font-bold
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded prose-strong:text-gray-200 whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </motion.div>
    </div>
  );
}
