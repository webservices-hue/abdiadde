import { Outlet, Link, createRootRoute, HeadContent, Scripts, ScriptOnce } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-[oklch(0.08_0.005_80)]">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';var d=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;if(d==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Abdi Adde — Filmmaker, Storyteller, Digital Architect" },
      { name: "description", content: "Cinematic portfolio of Abdi Adde — videographer, photographer, content creator and web systems developer with 500K+ audience worldwide." },
      { name: "author", content: "Abdi Adde" },
      { property: "og:title", content: "Abdi Adde — Filmmaker, Storyteller, Digital Architect" },
      { property: "og:description", content: "Cinematic portfolio of Abdi Adde — videographer, photographer, content creator and web systems developer with 500K+ audience worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
      { name: "twitter:title", content: "Abdi Adde — Filmmaker, Storyteller, Digital Architect" },
      { name: "twitter:description", content: "Cinematic portfolio of Abdi Adde — videographer, photographer, content creator and web systems developer with 500K+ audience worldwide." },
      { property: "og:url", content: "https://abdiadde.com" },
      { property: "og:site_name", content: "Abdi Adde" },
      { name: "robots", content: "index, follow" },
      { name: "generator", content: "Abdi Adde Studio" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e48aa64-d23d-4e15-bc78-1bdf84a9c972" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/4e48aa64-d23d-4e15-bc78-1bdf84a9c972" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{themeScript}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Outlet />
      </I18nProvider>
    </ThemeProvider>
  );
}
