import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Audience } from "@/components/Audience";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Audience />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Abdi Adde",
            jobTitle: "Filmmaker, Photographer, Content Creator, Web Developer",
            url: "https://abdiadde.com",
            sameAs: [
              "https://www.tiktok.com/@abdiaddee",
              "https://www.instagram.com/abdiaddee",
              "https://www.facebook.com/abdiaddee",
            ],
          }),
        }}
      />
    </div>
  );
}
