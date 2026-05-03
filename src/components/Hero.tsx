import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Sparkles, Youtube, Instagram, Facebook, Ghost } from "lucide-react";
import cameraImg from "@/assets/camera-hero.jpg";
import grainBg from "@/assets/grain-bg.jpg";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const TikTokIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94A8.16 8.16 0 0 0 22 11.13V7.69a4.85 4.85 0 0 1-2.41-1Z"/>
  </svg>
);

const SPRING = { stiffness: 120, damping: 30, mass: 0.35, restDelta: 0.001 };

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sp = useSpring(scrollYProgress, SPRING);

  // Camera shrinks/moves up to the back as user scrolls — never disappears entirely until end
  const cameraScale = useTransform(sp, [0, 0.5, 1], [1, 0.85, 0.55]);
  const cameraY = useTransform(sp, [0, 1], [0, -120]);
  const cameraOpacity = useTransform(sp, [0, 0.7, 1], [1, 0.45, 0.15]);
  const cameraBlur = useTransform(sp, [0, 1], [0, 6]);
  const cameraFilter = useTransform(cameraBlur, (b) => `blur(${b}px)`);

  // Hero text fades early
  const contentOpacity = useTransform(sp, [0, 0.18], [1, 0]);
  const contentY = useTransform(sp, [0, 0.3], [0, -60]);
  const scrollHintOpacity = useTransform(sp, [0, 0.1], [1, 0]);

  // Cards reveal in sequence as you scroll down, then HOLD fully visible
  // through a long "reading window" so you can pause and read the stats.
  // Scrolling back up reverses the same animation symmetrically.
  // Reveal window: 0.08 → 0.45 (staggered). Hold: 0.45 → 1.0.
  const card0 = useTransform(sp, [0.08, 0.22], [0, 1]);
  const card1 = useTransform(sp, [0.14, 0.28], [0, 1]);
  const card2 = useTransform(sp, [0.20, 0.34], [0, 1]);
  const card3 = useTransform(sp, [0.26, 0.40], [0, 1]);
  const card4 = useTransform(sp, [0.32, 0.46], [0, 1]);
  const cardProgress = [card0, card1, card2, card3, card4];

  const platforms = [
    { name: "YouTube", Icon: Youtube, count: SITE.followers.youtube.display, href: SITE.socials.youtube, color: "oklch(0.62 0.22 27)" },
    { name: "TikTok", Icon: TikTokIcon, count: SITE.followers.tiktok.display, href: SITE.socials.tiktok, color: "oklch(0.78 0.13 82)" },
    { name: "Instagram", Icon: Instagram, count: SITE.followers.instagram.display, href: SITE.socials.instagram, color: "oklch(0.65 0.23 350)" },
    { name: "Snapchat", Icon: Ghost, count: SITE.followers.snapchat.display, href: SITE.socials.snapchat, color: "oklch(0.92 0.18 100)" },
    { name: "Facebook", Icon: Facebook, count: SITE.followers.facebook.display, href: SITE.socials.facebook, color: "oklch(0.55 0.18 260)" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  return (
    <section ref={ref} className="relative h-[200vh] sm:h-[220vh]" id="top">
      <div ref={sectionRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <img src={grainBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.78_0.13_82_/_0.18),transparent_60%)]" />

        {/* Camera */}
        <motion.div
          style={{ scale: cameraScale, y: cameraY, opacity: cameraOpacity, filter: cameraFilter }}
          className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
        >
          <div className="relative w-[90%] max-w-3xl aspect-[3/2]">
            <div className="absolute -inset-20 bg-[radial-gradient(circle,oklch(0.78_0.13_82_/_0.25),transparent_70%)] blur-3xl" />
            <img
              src={cameraImg}
              alt="Cinema camera"
              width={1920}
              height={1080}
              className="relative w-full h-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* Hero text */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex items-end pb-16 sm:items-center sm:pb-0 justify-center px-4 will-change-transform"
        >
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-foreground/70 mb-6"
            >
              <Sparkles className="size-3.5 text-gold" />
              {t.hero.eyebrow}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 1 }}
              className="font-display font-bold leading-[0.9] text-[clamp(3rem,12vw,9rem)] tracking-tight"
            >
              <span className="block">ABDI</span>
              <span className="block text-gradient-gold">ADDE</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
            >
              {t.hero.intro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gold text-[oklch(0.08_0.005_80)] px-6 py-3 text-sm font-semibold hover:shadow-gold transition-all">
                <Play className="size-4 fill-current" />
                {t.hero.cta1}
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold hover:border-gold/50 transition-all">
                {t.hero.cta2}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Audience cards — start as soon as scroll begins */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-10 sm:pb-14 px-4 sm:px-6 pointer-events-none">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {platforms.map((p, i) => {
                const { Icon } = p;
                return (
                  <CardItem key={p.name} progress={cardProgress[i]} platform={p} Icon={Icon} />
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3 text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
          <span className="rotate-180 [writing-mode:vertical-rl]">REC · 04K · 24FPS · ISO 800</span>
        </div>
      </div>
    </section>
  );
}

function CardItem({
  progress,
  platform,
  Icon,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
  platform: { name: string; count: string; href: string; color: string };
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [60, 0]);
  const scale = useTransform(progress, [0, 1], [0.85, 1]);
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noreferrer"
      style={{ opacity, y, scale }}
      whileHover={{ y: -6 }}
      className="group glass-strong relative overflow-hidden rounded-2xl p-4 sm:p-5 hover:border-gold/40 transition-colors will-change-transform pointer-events-auto"
    >
      <div
        className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: platform.color }}
      />
      <Icon className="size-5 text-foreground/80 group-hover:text-gold transition-colors" />
      <div className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-gradient-gold">
        {platform.count}
      </div>
      <div className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">{platform.name}</div>
    </motion.a>
  );
}
