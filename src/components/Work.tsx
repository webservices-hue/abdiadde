import { motion } from "framer-motion";
import { useState } from "react";
import { Maximize2, X, ArrowUpRight } from "lucide-react";
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
          {SITE.videos.map((v, i) => {
            const isTikTok = v.type === "tiktok";
            const embedSrc = isTikTok
              ? `https://www.tiktok.com/embed/v2/${v.id}`
              : `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl glass"
              >
                <div className={isTikTok ? "relative aspect-[9/16] bg-black" : "relative aspect-video bg-black"}>
                  <iframe
                    src={embedSrc}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-gold/90">
                      0{i + 1} · {isTikTok ? "TikTok" : "Film"}
                    </div>
                    <div className="font-display font-semibold text-base mt-0.5">{v.title}</div>
                  </div>
                  <button
                    onClick={() => setOpen(v.id)}
                    aria-label="Open fullscreen"
                    className="shrink-0 size-9 rounded-full glass-strong flex items-center justify-center hover:bg-gold/80 hover:text-[oklch(0.08_0.005_80)] transition-colors"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {open && (() => {
        const video = SITE.videos.find((v) => v.id === open);
        if (!video) return null;
        const isTikTok = video.type === "tiktok";
        return (
          <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-flash">
            <button className="absolute top-6 right-6 size-10 rounded-full glass-strong flex items-center justify-center" aria-label="Close">
              <X className="size-5" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className={isTikTok ? "w-full max-w-[360px] aspect-[9/16] rounded-xl overflow-hidden shadow-elegant" : "w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-elegant"}
            >
              <iframe
                src={
                  isTikTok
                    ? `https://www.tiktok.com/embed/v2/${video.id}`
                    : `https://www.youtube.com/embed/${video.id}?autoplay=1`
                }
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        );
      })()}
    </section>
  );
}
