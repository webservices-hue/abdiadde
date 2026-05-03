import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light" | "system";

const Ctx = createContext<{ theme: Theme; setTheme: (t: Theme) => void; resolved: "dark" | "light" }>({
  theme: "dark", setTheme: () => {}, resolved: "dark",
});

function applyTheme(t: Theme): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const resolved = t === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : t;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) || "dark";
    setThemeState(saved);
    setResolved(applyTheme(saved));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (theme === "system") setResolved(applyTheme("system")); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    setResolved(applyTheme(t));
  };
  return <Ctx.Provider value={{ theme, setTheme, resolved }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
