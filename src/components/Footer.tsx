import { SITE } from "@/lib/site";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 py-12 px-4 sm:px-6 mt-12">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-display font-bold text-xl">
          <span className="text-gradient-gold">ABDI</span> ADDE
        </div>
        <div className="flex items-center gap-4">
          <a href={SITE.socials.youtube} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors"><Youtube className="size-5" /></a>
          <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors"><Instagram className="size-5" /></a>
          <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors"><Facebook className="size-5" /></a>
          <a href={SITE.socials.tiktok} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors text-sm font-bold">TikTok</a>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Crafted with care.
        </div>
      </div>
    </footer>
  );
}
