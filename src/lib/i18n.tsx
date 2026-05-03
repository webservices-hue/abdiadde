import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "so";

const en = {
    nav: { work: "Work", about: "About", services: "Services", contact: "Contact" },
    hero: {
      eyebrow: "Filmmaker · Storyteller · Digital Architect",
      cta1: "View Work",
      cta2: "Start a Project",
      intro: "I craft cinematic stories and digital systems for brands ready to be seen.",
      scroll: "Scroll to enter",
    },
    audience: {
      title: "Half a million strong",
      subtitle: "A global audience built one frame at a time.",
    },
    work: {
      title: "Featured Work",
      subtitle: "Cinematic films, brand stories and digital narratives.",
      more: "See more on TikTok",
    },
    about: {
      title: "About Me",
      body: "Hi, I'm Abdi-Addee — a Photographer and Content Creator. Welcome to my portfolio. I am passionate about capturing moments through photography and creating engaging digital content. My work focuses on storytelling, creativity, and bringing ideas to life through visuals.",
    },
    services: {
      title: "What I Do",
      subtitle: "Four disciplines, one obsession with quality.",
      items: {
        content: { title: "Content Creation", body: "Scroll-stopping social content engineered for reach and retention." },
        video: { title: "Video Editing", body: "Cinematic color, sound design and pace that holds attention." },
        photo: { title: "Photography", body: "Editorial, brand and lifestyle imagery with a signature look." },
        web: { title: "Web Systems", body: "Fast, beautiful websites & digital systems that convert." },
      },
    },
    collab: {
      title: "Let's Collaborate",
      subtitle: "Available for advertising, sponsorships, brand campaigns and creative partnerships.",
      items: ["Advertisement", "Sponsorship", "Brand Collab", "Content Campaigns"],
    },
    contact: {
      title: "Start Your Project",
      subtitle: "Tell me about your vision. I'll reply within 24 hours.",
      name: "Full Name", service: "Service", method: "Preferred Contact", notes: "Project Notes",
      submit: "Send via WhatsApp", book: "Book a Call",
      phone: "Phone", whatsapp: "WhatsApp", location: "Remote · Worldwide",
      success: "Opening WhatsApp…",
    },
  },
  so: {
    nav: { work: "Shaqo", about: "Ku Saabsan", services: "Adeegyo", contact: "Xiriir" },
    hero: {
      eyebrow: "Filim-sameeye · Sheekoyahan · Naqshade Dhijitaal",
      cta1: "Eeg Shaqada",
      cta2: "Bilow Mashruuc",
      intro: "Waxaan abuuraa sheekooyin dhab ah iyo nidaamyo dhijitaal ah oo astaamaha kor u qaada.",
      scroll: "Hoos u dhaadhac",
    },
    audience: {
      title: "Nus milyan oo daawade",
      subtitle: "Daawade caalami ah oo la dhisay sawir-sawir.",
    },
    work: {
      title: "Shaqada La Doortay",
      subtitle: "Filimo, sheekooyin astaan iyo dhambaalo dhijitaal.",
      more: "Ka eeg TikTok",
    },
    about: {
      title: "Ku Saabsan Aniga",
      body: "Salaan, waxaan ahay Abdi-Addee — Sawir-qaade iyo Abuuraha Maxaadooyinka. Ku soo dhaweyn bogga shaqadayda. Waxaan jeclahay qabashada xilliyada iyo abuurista nuxurka dhijitaalka. Shaqadaydu waxay diiradda saareysaa sheeko-sheegidda, hal-abuurnimada iyo nooleynta fikradaha.",
    },
    services: {
      title: "Waxaan Sameeyo",
      subtitle: "Afar fan, hal hadaf - tayo sare.",
      items: {
        content: { title: "Abuuritaanka Nuxurka", body: "Nuxur bulsho oo gaara dadka oo loo sameeyay gaarsiin iyo haynta." },
        video: { title: "Tafatirka Muuqaalka", body: "Midab filim, naqshad dhawaaq iyo xawaare hayste fiiro." },
        photo: { title: "Sawir Qaadid", body: "Sawirro daabacaad, astaan iyo nolol oo leh muuqaal gaar ah." },
        web: { title: "Nidaamyada Webka", body: "Bogag dhaqso, qurux iyo nidaamyo dhijitaal oo wax beddela." },
      },
    },
    collab: {
      title: "Aan Wadaagno Shaqo",
      subtitle: "Diyaar u ah xayeysiin, kafaala-qaad, ololeyaal astaan iyo iskaashi hal-abuur.",
      items: ["Xayeysiin", "Kafaala-qaad", "Iskaashi Astaan", "Ololayaasha Nuxurka"],
    },
    contact: {
      title: "Bilow Mashruucaaga",
      subtitle: "Ii sheeg fikradaada. Waxaan kaa jawaabi doonaa 24 saac gudahood.",
      name: "Magaca Buuxa", service: "Adeegga", method: "Habka Xiriirka", notes: "Faahfaahin",
      submit: "Ku dir WhatsApp", book: "Qabso Wicitaan",
      phone: "Telefoon", whatsapp: "WhatsApp", location: "Fog · Adduunka oo dhan",
      success: "Furaya WhatsApp…",
    },
  },
} as const;

type Dict = typeof dict["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en", setLang: () => {}, t: dict.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "so") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
