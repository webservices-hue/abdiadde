import { motion } from "framer-motion";
import portrait from "@/assets/abdi-portrait.png";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">About Me</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient-gold">About</span> Me
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-xs"
          >
            <div className="absolute -inset-6 bg-[radial-gradient(circle,oklch(0.78_0.13_82_/_0.3),transparent_70%)] blur-3xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong">
              <img src={portrait} alt="Abdi Adde portrait" loading="lazy" width={512} height={640}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-widest uppercase text-white/80">
                <span>Hargeisa · Somaliland</span>
                <span className="text-gold">f/1.8 · 35mm</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Capturing moments. <span className="text-gradient-gold">Crafting stories.</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
              Hi, I'm Abdi-Addee — a Photographer and Content Creator. Welcome to my portfolio website. I am passionate about capturing moments through photography and creating engaging digital content. My work focuses on storytelling, creativity, and bringing ideas to life through visuals.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { n: "8+", l: "Years" },
                { n: "200+", l: "Projects" },
                { n: "500K+", l: "Audience" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-gradient-gold">{s.n}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
