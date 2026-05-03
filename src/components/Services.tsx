import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useMotionPrefs } from "@/hooks/use-motion-prefs";
import { Camera, Film, Sparkles, Code2, Megaphone, Award, Handshake, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import svcContent from "@/assets/svc-content.jpg";
import svcVideo from "@/assets/svc-video.jpg";
import svcPhoto from "@/assets/svc-photo.jpg";
import svcWeb from "@/assets/svc-web.jpg";
import collabAd from "@/assets/collab-ad.jpg";
import collabSponsor from "@/assets/collab-sponsor.jpg";
import collabBrand from "@/assets/collab-brand.jpg";
import collabCampaign from "@/assets/collab-campaign.jpg";

const SPRING = { stiffness: 110, damping: 28, mass: 0.4, restDelta: 0.001 };

export function Services() {
  const { t } = useI18n();
  const items = [
    { key: "content" as const, Icon: Sparkles, image: svcContent },
    { key: "video" as const, Icon: Film, image: svcVideo },
    { key: "photo" as const, Icon: Camera, image: svcPhoto },
    { key: "web" as const, Icon: Code2, image: svcWeb },
  ];

  const { lite } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, SPRING);

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Liquid glass aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 size-[480px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_82_/_0.25),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 -right-24 size-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_300_/_0.18),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Services</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <ServiceCard key={item.key} index={i} total={items.length} sp={sp} item={item} t={t} lite={lite} />
          ))}
        </div>

        {/* Collaboration */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Collaboration</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">{t.collab.title}</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.collab.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { Icon: Megaphone, image: collabAd },
              { Icon: Award, image: collabSponsor },
              { Icon: Handshake, image: collabBrand },
              { Icon: Rocket, image: collabCampaign },
            ].map(({ Icon, image }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group liquid-glass rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center hover:border-gold/40 transition-all"
              >
                <Icon className="size-6 text-gold mb-3" />
                <div className="relative w-full aspect-[5/4] rounded-xl overflow-hidden mb-3">
                  <img src={image} alt="" loading="lazy" width={640} height={512} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>
                <div className="text-sm font-medium">{t.collab.items[i]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  total,
  sp,
  item,
  t,
  lite,
}: {
  index: number;
  total: number;
  sp: MotionValue<number>;
  item: { key: "content" | "video" | "photo" | "web"; Icon: React.ComponentType<{ className?: string }>; image: string };
  t: ReturnType<typeof useI18n>["t"];
  lite: boolean;
}) {
  // Each card animates as scroll progresses through the section
  const start = 0.15 + index * 0.08;
  const end = start + 0.18;
  const y = useTransform(sp, [start, end], [120, 0]);
  const opacity = useTransform(sp, [start, end], [0, 1]);
  const rotate = useTransform(sp, [start, end], [index % 2 === 0 ? -6 : 6, 0]);
  const scale = useTransform(sp, [start, end], [0.88, 1]);

  const data = t.services.items[item.key];
  const { Icon, image } = item;

  return (
    <motion.div
      style={{ y, opacity, rotate, scale }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-8 hover:border-gold/40 transition-colors will-change-transform"
    >
      {/* liquid sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-1/2 -left-1/3 size-[200%] rotate-12 bg-[linear-gradient(115deg,transparent_30%,oklch(0.95_0.05_85_/_0.08)_45%,transparent_60%)]" />
      </div>
      <div className="absolute -top-16 -right-16 size-40 rounded-full bg-gold/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="size-12 rounded-2xl glass-strong flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-[oklch(0.08_0.005_80)] transition-all">
          <Icon className="size-5" />
        </div>
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 ring-1 ring-border/40">
          <img src={image} alt={data.title} loading="lazy" width={768} height={512} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">{data.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.body}</p>
        <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-gold/70 font-mono">
          0{index + 1} / 0{total}
        </div>
      </div>
    </motion.div>
  );
}
