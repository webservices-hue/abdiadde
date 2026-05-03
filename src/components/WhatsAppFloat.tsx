import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppUrl, openExternalBlank } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";
import { toast } from "sonner";

export function WhatsAppFloat() {
  const handleClick = async () => {
    const url = buildWhatsAppUrl("Hello Abdi, I would like to start a project.");
    if (openExternalBlank(url)) return;
    try {
      await navigator.clipboard.writeText(SITE.whatsappDisplay);
      toast.success(`WhatsApp blocked here — number copied: ${SITE.whatsappDisplay}`);
    } catch {
      toast.message(`WhatsApp blocked. Reach me at ${SITE.whatsappDisplay}`);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-gold text-[oklch(0.08_0.005_80)] flex items-center justify-center shadow-gold animate-pulse-gold hover:scale-110 transition-transform"
    >
      <MessageCircle className="size-6 fill-current" />
    </motion.button>
  );
}
