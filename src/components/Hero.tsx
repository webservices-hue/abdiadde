import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Play, Sparkles } from "lucide-react";
import cameraImg from "@/assets/camera-hero.jpg";
import grainBg from "@/assets/grain-bg.jpg";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const cameraScale = useTransform(scrollYProgress, [0, 0.6], [1, 3.5]);
  const cameraRotate = useTransform(scrollYProgress, [0, 0.6], [0, 12]);
  const cameraOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const flashOpacity = useTransform(scrollYProgress, [0.55, 0.62, 0.7], [0, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setRevealed(v > 0.6));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative h-[200vh]" id="top">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background grain & glow */}
        <div className="absolute inset-0 bg-background" />
        <img src={grainBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.78_0.13_82_/_0.18),transparent_60%)]" />

        {/* Flash overlay */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-white pointer-events-none z-30"
        />

        {/* Camera */}
        <motion.div
          style={{ scale: cameraScale, rotate: cameraRotate, opacity: cameraOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10"
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

        {/* Hero content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex items-end pb-16 sm:items-center sm:pb-0 justify-center px-4"
        >
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-foreground/70 mb-6"
            >
              <Sparkles className="size-3.5 text-gold" />
              {t.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1 }}
              className="font-display font-bold leading-[0.9] text-[clamp(3rem,12vw,9rem)] tracking-tight"
            >
              <span className="block">ABDI</span>
              <span className="block text-gradient-gold">ADDE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
            >
              {t.hero.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="mt-16 flex flex-col items-center gap-2 text-xs text-muted-foreground/70 tracking-widest uppercase"
            >
              <span>{t.hero.scroll}</span>
              <ArrowDown className="size-4 animate-bounce" />
            </motion.div>
          </div>
        </motion.div>

        {/* Side meta */}
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
