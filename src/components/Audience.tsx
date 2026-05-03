import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Youtube, Instagram, Facebook } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const TikTokIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94A8.16 8.16 0 0 0 22 11.13V7.69a4.85 4.85 0 0 1-2.41-1Z"/>
  </svg>
);

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(start + (to - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  const fmt = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : `${v}`;
  return <span ref={ref}>{fmt(n)}{suffix}</span>;
}

export function Audience() {
  const { t } = useI18n();
  const platforms = [
    { name: "YouTube", icon: Youtube, count: SITE.followers.youtube, href: SITE.socials.youtube, color: "oklch(0.62 0.22 27)" },
    { name: "TikTok", icon: TikTokIcon, count: SITE.followers.tiktok, href: SITE.socials.tiktok, color: "oklch(0.78 0.13 82)" },
    { name: "Instagram", icon: Instagram, count: SITE.followers.instagram, href: SITE.socials.instagram, color: "oklch(0.65 0.23 350)" },
    { name: "Facebook", icon: Facebook, count: SITE.followers.facebook, href: SITE.socials.facebook, color: "oklch(0.55 0.18 260)" },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">500K+ Audience</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">{t.audience.title}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.audience.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group glass relative overflow-hidden rounded-2xl p-6 sm:p-8 hover:border-gold/40 transition-all"
              >
                <div
                  className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: p.color }}
                />
                <Icon className="size-7 text-foreground/80 group-hover:text-gold transition-colors" />
                <div className="mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  <Counter to={p.count} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{p.name}</div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
