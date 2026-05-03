import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Play, Sparkles, Youtube, Instagram, Facebook } from "lucide-react";
import cameraImg from "@/assets/camera-hero.jpg";
import grainBg from "@/assets/grain-bg.jpg";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const TikTokIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94A8.16 8.16 0 0 0 22 11.13V7.69a4.85 4.85 0 0 1-2.41-1Z"/>
  </svg>
);

function Counter({ to, active }: { to: number; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const duration = 1500;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, to]);
  const fmt = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : `${v}`;
  return <span ref={ref}>{fmt(n)}+</span>;
}

const SPRING = { stiffness: 80, damping: 22, mass: 0.6 };

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Smooth spring-driven progress for reversible animation
  const sp = useSpring(scrollYProgress, SPRING);

  // Camera transforms (eased through spring)
  const cameraScale = useTransform(sp, [0, 0.55], [1, 2.6]);
  const cameraRotate = useTransform(sp, [0, 0.55], [0, 8]);
  const cameraOpacity = useTransform(sp, [0.35, 0.6], [1, 0]);
  const cameraBlur = useTransform(sp, [0.35, 0.6], [0, 8]);
  const cameraFilter = useTransform(cameraBlur, (b) => `blur(${b}px)`);

  // Flash
  const flashOpacity = useTransform(sp, [0.5, 0.57, 0.65], [0, 0.9, 0]);

  // Hero text
  const contentOpacity = useTransform(sp, [0.05, 0.3], [1, 0]);
  const contentY = useTransform(sp, [0, 0.4], [0, -60]);

  // Cards reveal (after flash)
  const cardsOpacity = useTransform(sp, [0.6, 0.78], [0, 1]);
  const cardsY = useTransform(sp, [0.6, 0.85], [60, 0]);
  const cardsScale = useTransform(sp, [0.6, 0.85], [0.92, 1]);

  // Per-card stagger via different ranges
  const card0 = useTransform(sp, [0.62, 0.74], [0, 1]);
  const card1 = useTransform(sp, [0.66, 0.78], [0, 1]);
  const card2 = useTransform(sp, [0.7, 0.82], [0, 1]);
  const card3 = useTransform(sp, [0.74, 0.86], [0, 1]);
  const cardProgress = [card0, card1, card2, card3];

  const [phase, setPhase] = useState<"intro" | "cards">("intro");
  useEffect(() => {
    const unsub = sp.on("change", (v) => setPhase(v > 0.65 ? "cards" : "intro"));
    return () => unsub();
  }, [sp]);

  const platforms = [
    { name: "YouTube", Icon: Youtube, count: SITE.followers.youtube, href: SITE.socials.youtube, color: "oklch(0.62 0.22 27)" },
    { name: "TikTok", Icon: TikTokIcon, count: SITE.followers.tiktok, href: SITE.socials.tiktok, color: "oklch(0.78 0.13 82)" },
    { name: "Instagram", Icon: Instagram, count: SITE.followers.instagram, href: SITE.socials.instagram, color: "oklch(0.65 0.23 350)" },
    { name: "Facebook", Icon: Facebook, count: SITE.followers.facebook, href: SITE.socials.facebook, color: "oklch(0.55 0.18 260)" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  return (
    <section ref={ref} className="relative h-[260vh]" id="top">
      <div ref={sectionRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <img src={grainBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.78_0.13_82_/_0.18),transparent_60%)]" />

        {/* Flash */}
        <motion.div style={{ opacity: flashOpacity }} className="absolute inset-0 bg-white pointer-events-none z-30" />

        {/* Camera */}
        <motion.div
          style={{ scale: cameraScale, rotate: cameraRotate, opacity: cameraOpacity, filter: cameraFilter }}
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
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-gold text-[oklch(0.08_0.005_80)] px-6 py-3 text-sm font-semibold hover:shadow-gold transition-all">
                <Play className="size-4 fill-current" />
                {t.hero.cta1}
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold hover:border-gold/50 transition-all">
                {t.hero.cta2}
              </a>
            </motion.div>
            <motion.div
              style={{ opacity: useTransform(sp, [0, 0.15], [1, 0]) }}
              className="mt-16 flex flex-col items-center gap-2 text-xs text-muted-foreground/70 tracking-widest uppercase"
            >
              <span>{t.hero.scroll}</span>
              <ArrowDown className="size-4 animate-bounce" />
            </motion.div>
          </div>
        </motion.div>

        {/* Audience cards — appear after flash */}
        <motion.div
          style={{ opacity: cardsOpacity, y: cardsY, scale: cardsScale }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 will-change-transform"
        >
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">500K+ Audience</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">{t.audience.title}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full max-w-5xl">
            {platforms.map((p, i) => {
              const { Icon } = p;
              return (
                <CardItem key={p.name} progress={cardProgress[i]} active={phase === "cards"} platform={p} Icon={Icon} />
              );
            })}
          </div>
        </motion.div>

        <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-3 text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
          <span className="rotate-180 [writing-mode:vertical-rl]">REC · 04K · 24FPS · ISO 800</span>
        </div>
        <div className="absolute right-6 bottom-6 z-20 text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase font-mono">
          © {new Date().getFullYear()} · {SITE.name}
        </div>
      </div>
    </section>
  );
}

function CardItem({
  progress,
  active,
  platform,
  Icon,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
  active: boolean;
  platform: { name: string; count: number; href: string; color: string };
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [40, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noreferrer"
      style={{ opacity, y, scale }}
      whileHover={{ y: -6 }}
      className="group glass relative overflow-hidden rounded-2xl p-5 sm:p-6 hover:border-gold/40 transition-colors will-change-transform"
    >
      <div
        className="absolute -top-12 -right-12 size-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: platform.color }}
      />
      <Icon className="size-6 text-foreground/80 group-hover:text-gold transition-colors" />
      <div className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight">
        <Counter to={platform.count} active={active} />
      </div>
      <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{platform.name}</div>
    </motion.a>
  );
}
