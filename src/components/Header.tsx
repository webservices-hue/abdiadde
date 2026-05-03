import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y <= 10) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cycleTheme = () => {
    const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    setTheme(next);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"} ${hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500 ${scrolled ? "" : ""}`}>
        <div className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-strong shadow-elegant" : ""}`}>
          <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="text-gradient-gold text-lg sm:text-xl">ABDI</span>
            <span className="text-foreground/90 text-lg sm:text-xl">ADDE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#work" className="text-foreground/70 hover:text-gold transition-colors">{t.nav.work}</a>
            <a href="#about" className="text-foreground/70 hover:text-gold transition-colors">{t.nav.about}</a>
            <a href="#services" className="text-foreground/70 hover:text-gold transition-colors">{t.nav.services}</a>
            <a href="#contact" className="text-foreground/70 hover:text-gold transition-colors">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "so" : "en")}
              className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium hover:border-gold/40 transition-all"
              aria-label="Toggle language"
            >
              <Languages className="size-3.5" />
              <span className="uppercase">{lang}</span>
            </button>
            <button
              onClick={cycleTheme}
              className="flex items-center justify-center rounded-full glass size-8 hover:border-gold/40 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" && <Moon className="size-3.5" />}
              {theme === "light" && <Sun className="size-3.5" />}
              {theme === "system" && <Monitor className="size-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
