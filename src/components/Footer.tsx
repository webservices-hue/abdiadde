import { SITE } from "@/lib/site";
import { Instagram, Facebook, Youtube, Ghost } from "lucide-react";
import logoImg from "@/assets/abdi-logo.png";
import { buildWhatsAppUrl, openExternalBlank } from "@/lib/whatsapp";
import { toast } from "sonner";

export function Footer() {
  const handleWhatsApp = async () => {
    const url = buildWhatsAppUrl("Hello Abdi, I would like to connect on WhatsApp.");
    if (openExternalBlank(url)) return;
    try {
      await navigator.clipboard.writeText(SITE.whatsappDisplay);
      toast.success(`WhatsApp blocked here — number copied: ${SITE.whatsappDisplay}`);
    } catch {
      toast.message(`WhatsApp blocked. Reach me at ${SITE.whatsappDisplay}`);
    }
  };
  return (
    <footer className="relative border-t border-border/40 pt-16 pb-10 px-4 sm:px-6 mt-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_82_/_0.18),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          {/* Brand */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <img src={logoImg} alt="Abdiaddee Media Solutions" className="h-16 sm:h-20 w-auto object-contain mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Filmmaker, photographer and digital architect crafting cinematic stories and modern web experiences from Hargeisa, Somaliland — for a global audience of 500K+.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Follow the Journey</p>
            <div className="flex items-center gap-3">
              <a href={SITE.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="size-11 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"><Youtube className="size-5" /></a>
              <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="size-11 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"><Instagram className="size-5" /></a>
              <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="size-11 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"><Facebook className="size-5" /></a>
              <a href={SITE.socials.snapchat} target="_blank" rel="noreferrer" aria-label="Snapchat" className="size-11 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"><Ghost className="size-5" /></a>
              <a href={SITE.socials.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="size-11 rounded-full glass-strong flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors text-xs font-bold">TT</a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-right">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Get in Touch</p>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="block text-sm hover:text-gold transition-colors mx-auto lg:ml-auto lg:mr-0"
            >
              {SITE.whatsappDisplay}
            </button>
            <p className="text-sm text-muted-foreground mt-1">Hargeisa · Somaliland</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="text-base sm:text-lg font-medium">
            © {new Date().getFullYear()} <span className="text-gradient-gold font-display font-bold">Abdiaddee Media Solutions</span>. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground inline-flex items-center gap-2">
            Designed & built by{" "}
            <a
              href="https://www.heero.space/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-gold hover:underline underline-offset-4"
            >
              Heero Space
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
