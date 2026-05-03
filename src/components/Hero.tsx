import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Sparkles } from "lucide-react";
import cameraImg from "@/assets/camera-hero.jpg";
import grainBg from "@/assets/grain-bg.jpg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  return (
    <section ref={sectionRef} id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Background camera image with subtle ambient motion */}
      <motion.img
        src={cameraImg}
        alt="Cinema camera"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.14 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      <img src={grainBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.78_0.13_82_/_0.18),transparent_60%)] pointer-events-none" />

      {/* Hero text */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-foreground/80 mb-6"
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
            className="mt-6 text-base sm:text-lg text-foreground/85 max-w-xl mx-auto"
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
        </div>
      </div>
    </section>
  );
}
