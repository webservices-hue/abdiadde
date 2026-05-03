import { motion } from "framer-motion";
import { useState } from "react";
import { Play, ArrowUpRight, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export function Work() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Featured</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">{t.work.title}</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">{t.work.subtitle}</p>
          </div>
          <a href={SITE.socials.tiktok} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:gap-3 transition-all">
            {t.work.more}
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {SITE.videos.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={() => setOpen(v.id)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass text-left"
            >
              <img
                src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-16 rounded-full glass-strong flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/80 transition-all">
                  <Play className="size-6 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-xs tracking-widest uppercase text-gold/90 mb-1">0{i + 1} · Film</div>
                <div className="font-display font-semibold text-lg">{v.title}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-flash">
          <button className="absolute top-6 right-6 size-10 rounded-full glass-strong flex items-center justify-center" aria-label="Close">
            <X className="size-5" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-elegant">
            <iframe
              src={`https://www.youtube.com/embed/${open}?autoplay=1`}
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
