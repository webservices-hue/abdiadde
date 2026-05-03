import { motion } from "framer-motion";
import { Youtube, Instagram, Facebook, Ghost } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const TikTokIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94A8.16 8.16 0 0 0 22 11.13V7.69a4.85 4.85 0 0 1-2.41-1Z"/>
  </svg>
);

export function Audience() {
  const { t } = useI18n();
  const platforms = [
    { name: "YouTube", Icon: Youtube, count: SITE.followers.youtube.display, href: SITE.socials.youtube, color: "oklch(0.62 0.22 27)" },
    { name: "TikTok", Icon: TikTokIcon, count: SITE.followers.tiktok.display, href: SITE.socials.tiktok, color: "oklch(0.78 0.13 82)" },
    { name: "Instagram", Icon: Instagram, count: SITE.followers.instagram.display, href: SITE.socials.instagram, color: "oklch(0.65 0.23 350)" },
    { name: "Snapchat", Icon: Ghost, count: SITE.followers.snapchat.display, href: SITE.socials.snapchat, color: "oklch(0.92 0.18 100)" },
    { name: "Facebook", Icon: Facebook, count: SITE.followers.facebook.display, href: SITE.socials.facebook, color: "oklch(0.55 0.18 260)" },
  ];

  return (
    <section id="audience" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight"
          >
            {t.audience.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-muted-foreground"
          >
            {t.audience.subtitle}
          </motion.p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {platforms.map((p, i) => {
            const { Icon } = p;
            return (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group glass-strong relative overflow-hidden rounded-2xl p-4 sm:p-5 hover:border-gold/40 transition-colors"
              >
                <div
                  className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: p.color }}
                />
                <Icon className="size-5 text-foreground/80 group-hover:text-gold transition-colors" />
                <div className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-gradient-gold">
                  {p.count}
                </div>
                <div className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">{p.name}</div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
