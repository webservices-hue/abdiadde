import { motion } from "framer-motion";
import { Camera, Film, Sparkles, Code2, Megaphone, Award, Handshake, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t } = useI18n();
  const items = [
    { key: "content" as const, Icon: Sparkles },
    { key: "video" as const, Icon: Film },
    { key: "photo" as const, Icon: Camera },
    { key: "web" as const, Icon: Code2 },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Services</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => {
            const data = t.services.items[item.key];
            const { Icon } = item;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 sm:p-8 hover:border-gold/40 transition-all"
              >
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="size-12 rounded-xl glass-strong flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-[oklch(0.08_0.005_80)] transition-all">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{data.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{data.body}</p>
                  <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-gold/70 font-mono">
                    0{i + 1} / 04
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Collaboration */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Collaboration</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">{t.collab.title}</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.collab.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[Megaphone, Award, Handshake, Rocket].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center hover:border-gold/40 transition-all"
              >
                <Icon className="size-6 text-gold mb-3" />
                <div className="text-sm font-medium">{t.collab.items[i]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
