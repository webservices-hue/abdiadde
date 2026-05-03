import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Phone, MessageCircle, MapPin, Send, Calendar } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const services = ["Content Creation", "Video Editing", "Photography", "Web Systems"];
const methods = ["WhatsApp", "Phone"];

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", service: services[0], method: methods[0], phone: "", notes: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const fullPhone = `+252${form.phone.replace(/^0+/, "")}`;
    const msg = `Hello Abdi, my name is ${form.name}. I'm interested in ${form.service}.\nProject details: ${form.notes}.\nPreferred contact: ${form.method} (${fullPhone}).`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
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
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-gold/40 transition-all">
              <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center"><MessageCircle className="size-4 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.contact.whatsapp}</div>
                <div className="font-medium">{SITE.whatsappDisplay}</div>
              </div>
            </a>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-gold/10 flex items-center justify-center"><MapPin className="size-4 text-gold" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                <div className="font-medium">{t.contact.location}</div>
              </div>
            </div>
            <a href={SITE.calendly} target="_blank" rel="noreferrer"
              className="glass-strong rounded-2xl p-5 flex items-center justify-between hover:border-gold/50 transition-all">
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-gold" />
                <div>
                  <div className="font-semibold">{t.contact.book}</div>
                  <div className="text-xs text-muted-foreground">via Calendly</div>
                </div>
              </div>
              <Send className="size-4 text-gold" />
            </a>
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
    </section>
  );
}
