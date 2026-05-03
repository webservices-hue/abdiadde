import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { motion } from "framer-motion";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-gold text-[oklch(0.08_0.005_80)] flex items-center justify-center shadow-gold animate-pulse-gold hover:scale-110 transition-transform"
    >
      <MessageCircle className="size-6 fill-current" />
    </motion.a>
  );
}
