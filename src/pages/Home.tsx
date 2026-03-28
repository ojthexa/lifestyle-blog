import { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import heroImage from "@/src/assets/hero-image.jpg";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded text-primary text-xs font-mono uppercase tracking-widest">
                {t.experimentalProject}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
                {t.heroTitle1}
                <br />
                <span className="text-primary">{t.heroTitle2}</span>
                <br />
                {t.heroTitle3}
              </h1>
              <p className="max-w-lg text-muted-foreground text-lg leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/blog"
                  className="bg-primary text-primary-foreground px-8 py-4 font-bold hover:opacity-90 transition-opacity flex items-center gap-2 text-sm uppercase tracking-wider"
                >
                  {t.readBlog} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src={heroImage}
                alt="Blog Engine powered by Spreadsheet"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg shadow-2xl border border-border"
              />
            </motion.div>
          </div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* How It Works */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="space-y-3">
              <p className="text-primary font-mono text-sm uppercase tracking-widest">{t.howItWorks}</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.howItWorksTitle}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-border">
              <FeatureCard
                icon={<Database className="w-6 h-6 text-primary" />}
                step="01"
                title={t.step1Title}
                description={t.step1Desc}
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-primary" />}
                step="02"
                title={t.step2Title}
                description={t.step2Desc}
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-primary" />}
                step="03"
                title={t.step3Title}
                description={t.step3Desc}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">{t.readyToStart}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t.readyDesc}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 font-bold hover:opacity-90 transition-opacity text-sm uppercase tracking-wider"
          >
            {t.viewBlog} <ArrowRight className="w-4 h-4" />
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
      className="bg-background p-10 space-y-4"
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-muted-foreground/50 font-mono text-sm">{step}</span>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
