import { motion } from "framer-motion";
import portrait from "@/assets/abdi-portrait.jpg";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-[radial-gradient(circle,oklch(0.78_0.13_82_/_0.3),transparent_70%)] blur-3xl" />
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong">
            <img src={portrait} alt="Abdi Adde portrait" loading="lazy" width={1024} height={1280}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-widest uppercase text-white/80">
              <span>Mogadishu · 2025</span>
              <span className="text-gold">f/1.8 · 35mm</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">{t.about.title}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Capturing moments. <br /><span className="text-gradient-gold">Crafting stories.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">{t.about.body}</p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: "8+", l: "Years" },
              { n: "200+", l: "Projects" },
              { n: "500K+", l: "Audience" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5 text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
