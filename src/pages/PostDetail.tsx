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
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-center">
        <p className="font-medium">{error || "Postingan tidak ditemukan"}</p>
        <Link to="/blog" className="inline-block mt-4 text-indigo-600 hover:underline">
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
      </Link>

      <article className="space-y-8">
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-500 border-b border-gray-100 pb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Oleh {post.author}
              </span>
            )}
          </div>
        </header>

        {post.image_url && (
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-md whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </motion.div>
  );
}
