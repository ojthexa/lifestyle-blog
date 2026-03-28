import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { googleSheetsService, GPost } from "@/src/services/googleSheets";
import { Loader2, Calendar, User, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<GPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const data = await googleSheetsService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError("Post not found.");
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
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error || "Post not found"}</p>
          <Link to="/blog" className="inline-block text-primary hover:opacity-80 font-bold text-sm uppercase tracking-wider">
            ← {t.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        <article className="space-y-8">
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground font-mono text-sm border-b border-border pb-8">
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

          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed
              prose-headings:text-foreground prose-headings:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded prose-strong:text-foreground whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </motion.div>
    </div>
  );
}
