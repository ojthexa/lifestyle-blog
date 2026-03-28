import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { googleSheetsService, GPost } from "@/src/services/googleSheets";
import { Loader2, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState<GPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await googleSheetsService.getPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load posts.");
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

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl p-8 bg-destructive/10 text-destructive rounded border border-destructive/30 text-center">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-background min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-2xl p-8 bg-muted text-muted-foreground rounded border border-border text-center">
          <p className="font-medium">{t.noPosts}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="space-y-3">
          <p className="text-primary font-mono text-sm uppercase tracking-widest">{t.blog}</p>
          <h1 className="text-4xl font-black tracking-tight">{t.latestPosts}</h1>
          <p className="text-muted-foreground text-lg">{t.blogSubtitle}</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {paginatedPosts.map((post, index) => (
            <motion.article
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-background p-0 flex flex-col"
            >
              {post.image_url && (
                <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-80 hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              )}
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
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
                  <h2 className="text-lg font-bold hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-primary font-bold text-sm hover:opacity-80 transition-opacity uppercase tracking-wider pt-2"
                >
                  {t.read} →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 border border-border rounded text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> {t.previous}
            </button>
            <span className="text-muted-foreground font-mono text-sm">
              {t.page} {currentPage} {t.of} {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 border border-border rounded text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t.next} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
