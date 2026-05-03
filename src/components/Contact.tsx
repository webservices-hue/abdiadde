import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Phone, MessageCircle, MapPin, Send, Copy, X, Check, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { buildWhatsAppUrl, openExternalBlank } from "@/lib/whatsapp";

const services = ["Content Creation", "Video Editing", "Photography", "Web Systems"];
const methods = ["WhatsApp", "Phone"];

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", service: services[0], method: methods[0], phone: "", notes: "" });
  const [fallback, setFallback] = useState<{ phone: string; message: string; url: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Copy failed — please copy manually");
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const fullPhone = `+252${form.phone.replace(/^0+/, "")}`;
    const message = `Hello Abdi, my name is ${form.name}. I'm interested in ${form.service}.\nProject details: ${form.notes}.\nPreferred contact: ${form.method} (${fullPhone}).`;
    const url = buildWhatsAppUrl(message);
    if (!openExternalBlank(url)) {
      setFallback({ phone: SITE.whatsappDisplay, message, url });
    }
  };

  const openBookingWhatsApp = () => {
    const message = "Hello Abdi, I would like to book a call through WhatsApp.";
    const url = buildWhatsAppUrl(message);
    if (!openExternalBlank(url)) {
      setFallback({ phone: SITE.whatsappDisplay, message, url });
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">Contact</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold">{t.contact.title}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <a href={`tel:${SITE.phone}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-gold/40 transition-all">
              <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center"><Phone className="size-4 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.phone}</div>
                <div className="font-medium">{SITE.phone}</div>
              </div>
            </a>
            <button
              type="button"
              onClick={openBookingWhatsApp}
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-gold/40 transition-all text-left"
            >
              <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center"><MessageCircle className="size-4 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.whatsapp}</div>
                <div className="font-medium">{SITE.whatsappDisplay}</div>
              </div>
            </button>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center"><MapPin className="size-4 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                <div className="font-medium">{t.contact.location}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={openBookingWhatsApp}
              className="glass-strong w-full rounded-2xl p-5 flex items-center justify-between hover:border-gold/50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="size-5 text-gold" />
                <div>
                  <div className="font-semibold">{t.contact.book}</div>
                  <div className="text-xs text-muted-foreground">via WhatsApp</div>
                </div>
              </div>
              <Send className="size-4 text-gold" />
            </button>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-10 space-y-5"
          >
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.name}</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full bg-input/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.service}</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 w-full bg-input/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold/50"
                >
                  {services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.method}</label>
                <select
                  value={form.method}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                  className="mt-2 w-full bg-input/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold/50"
                >
                  {methods.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                {form.method === "WhatsApp" ? "WhatsApp Number" : "Phone Number"}
              </label>
              <div className="mt-2 flex items-stretch rounded-xl bg-input/40 focus-within:ring-2 focus-within:ring-gold/50 overflow-hidden">
                <span className="px-4 flex items-center text-sm text-gold border-r border-border/40 bg-background/30">+252</span>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{7,12}"
                  maxLength={12}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, "") })}
                  className="flex-1 bg-transparent px-4 py-3 outline-none"
                  placeholder="63 422 9393"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.notes}</label>
              <textarea
                required
                rows={5}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="mt-2 w-full bg-input/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-[oklch(0.08_0.005_80)] px-6 py-4 font-semibold hover:shadow-gold transition-all"
            >
              <MessageCircle className="size-4" />
              {t.contact.submit}
              <Send className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {fallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setFallback(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-lg rounded-3xl p-6 sm:p-8"
            >
              <button
                aria-label="Close"
                onClick={() => setFallback(null)}
                className="absolute top-4 right-4 size-9 rounded-full glass flex items-center justify-center hover:border-gold/40"
              >
                <X className="size-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <MessageCircle className="size-5 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold">WhatsApp blocked</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                We couldn't open WhatsApp automatically. Copy the details below and send them manually, or try the direct link.
              </p>

              <div className="space-y-3">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                    <button
                      type="button"
                      onClick={() => copy("Phone", fallback.phone)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                    >
                      {copied === "Phone" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      {copied === "Phone" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="font-medium select-all break-all">{fallback.phone}</div>
                </div>

                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Message</div>
                    <button
                      type="button"
                      onClick={() => copy("Message", fallback.message)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                    >
                      {copied === "Message" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      {copied === "Message" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="mt-1 text-sm whitespace-pre-wrap font-sans text-foreground/90 select-all max-h-48 overflow-y-auto">{fallback.message}</pre>
                </div>
              </div>

              <a
                href={fallback.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-[oklch(0.08_0.005_80)] px-6 py-3 font-semibold hover:shadow-gold transition-all"
              >
                <ExternalLink className="size-4" />
                Open WhatsApp link
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
