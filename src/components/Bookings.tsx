import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Instagram, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { serviceOptions, site, whatsappHref } from "@/data/content";
import { Button } from "@/components/ui/button";

// Configured with Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export default function Bookings() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Today's date string for min attribute in date picker
  const today = new Date().toISOString().split("T")[0];

  const triggerMailtoFallback = (
    name: string,
    mobile: string,
    email: string,
    service: string,
    location: string,
    prefDate: string,
    message: string
  ) => {
    const subject = encodeURIComponent(`[SB AERIALS] Official Booking Request - ${service} (${name})`);
    const body = encodeURIComponent(
      `SB AERIALS — OFFICIAL BOOKING REQUEST\n` +
      `========================================\n` +
      `Organization: SB Aerials\n` +
      `Client Name: ${name}\n` +
      `Mobile Number (+91): ${mobile}\n` +
      `Email Address: ${email}\n` +
      `Service Requested: ${service}\n` +
      `Shoot Location: ${location || "Not specified"}\n` +
      `Preferred Date: ${prefDate || "Not specified"}\n` +
      `========================================\n` +
      `Message / Details:\n${message || "No additional message provided."}\n`
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    formRef.current?.reset();
    setTimeout(() => setSubmitted(false), 7000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("from_name") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("from_email") as string;
    const service = formData.get("service") as string;
    const location = formData.get("location") as string;
    const prefDate = formData.get("pref_date") as string;
    const message = formData.get("message") as string;

    setLoading(true);

    try {
      if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
        // Send background email directly via Web3Forms API
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `SB AERIALS | New Booking Request — ${service} (${name})`,
            from_name: "SB Aerials Booking System",
            replyto: email,
            "Full Name": name,
            "Mobile Number": `+91 ${mobile}`,
            "Email Address": email,
            "Service Requested": service,
            "Shoot Location": location || "Not specified",
            "Preferred Date": prefDate || "Not specified",
            "Client Message": message || "No message provided",
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setSubmitted(true);
          formRef.current.reset();
          setTimeout(() => setSubmitted(false), 7000);
        } else {
          triggerMailtoFallback(name, mobile, email, service, location, prefDate, message);
        }
      } else {
        // Direct email fallback if access key not added yet
        triggerMailtoFallback(name, mobile, email, service, location, prefDate, message);
      }
    } catch {
      triggerMailtoFallback(name, mobile, email, service, location, prefDate, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bookings" className="bg-void py-24 md:py-[120px] relative">
      <div className="wrap">
        {/* Organization Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head !pt-0 max-w-[720px]"
        >
          <div className="flex items-center gap-3.5 mb-4">
            <img src="/images/logo.png" alt="SB Aerials Logo" className="h-10 w-auto" />
            <div className="font-mono text-[11px] tracking-[0.2em] text-brand-light uppercase font-semibold">
              SB AERIALS · OFFICIAL BOOKING SYSTEM
            </div>
          </div>

          <h2>Book Your Shoot.</h2>
          <p>
            Fill in your shoot details below. Submitting will send an official request directly to{" "}
            <b className="text-cloud font-mono font-normal">contact.sbaerials@gmail.com</b>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 mt-8">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="field">
                <label>Full Name *</label>
                <input type="text" name="from_name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label>Mobile Number (10 Digits) *</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  maxLength={10}
                  minLength={10}
                  pattern="[6-9][0-9]{9}"
                  title="Please enter a valid 10-digit Indian mobile number"
                  placeholder="10-digit mobile number"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="field">
                <label>Your Email *</label>
                <input type="email" name="from_email" required placeholder="you@example.com" />
              </div>
              <div className="field">
                <label>Service Required *</label>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select service
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="field">
                <label>Shoot Location</label>
                <input type="text" name="location" placeholder="City / venue address" />
              </div>
              <div className="field">
                <label>Preferred Date *</label>
                <input
                  type="date"
                  name="pref_date"
                  required
                  min={today}
                  className="cursor-pointer"
                  onClick={(e) => {
                    if ("showPicker" in e.currentTarget) {
                      e.currentTarget.showPicker();
                    }
                  }}
                />
              </div>
            </div>

            <div className="field">
              <label>Message / Shoot Scope</label>
              <textarea
                name="message"
                placeholder="Tell us about your shoot requirements, location, duration..."
              />
            </div>

            <Button type="submit" variant="primary" size="full" disabled={loading} className="mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending Mail...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Email
                </span>
              )}
            </Button>

            {submitted && (
              <div className="p-4 rounded-sm bg-brand-blue/10 border border-brand-light/30 font-mono text-xs text-brand-light flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                <span>Mail sent successfully, will contact you shortly</span>
              </div>
            )}
          </motion.form>

          {/* Right Direct Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="border border-white/10 rounded-md p-9 h-fit bg-gradient-to-br from-brand-blue/[0.08] to-transparent flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <img src="/images/logo.png" alt="SB Aerials Logo" className="h-9 w-auto" />
              <div>
                <div className="font-display font-bold text-lg text-cloud leading-none">SB AERIALS</div>
                <div className="font-mono text-[9px] tracking-widest text-steel mt-1 uppercase">
                  Drone Photography &amp; Videography
                </div>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-2.5">DIRECT CONTACT</div>
              <h3 className="text-xl uppercase mb-2">Reach Out Directly</h3>
              <p className="text-steel text-[14px] leading-relaxed">
                Prefer to email or call directly? Contact SB Aerials anytime for fast shoot booking and quotes.
              </p>
            </div>

            <div className="space-y-3.5 pt-2 border-t border-white/10">
              <div className="font-mono text-xs text-steel">
                EMAIL —{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-cloud font-medium hover:text-brand-light transition-colors"
                >
                  contact.sbaerials@gmail.com
                </a>
              </div>

              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-mono text-lg text-cloud hover:text-brand-light transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-light" />
                {site.phone}
              </a>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs text-steel pt-3 border-t border-white/10">
              <span>
                Based in — <b className="text-cloud font-normal">{site.location}</b>
              </span>
              <span>
                Coverage — <b className="text-cloud font-normal">Tamil Nadu &amp; South India</b>
              </span>
              <span>
                Turnaround — <b className="text-cloud font-normal">Within 24–48 Hours</b>
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                title="WhatsApp Chat"
                className="w-[42px] h-[42px] border border-white/10 rounded-full flex items-center justify-center hover:border-brand-light hover:bg-brand-blue/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-brand-light" />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener"
                title="Instagram"
                className="w-[42px] h-[42px] border border-white/10 rounded-full flex items-center justify-center hover:border-brand-light hover:bg-brand-blue/10 transition-colors"
              >
                <Instagram className="w-4 h-4 text-brand-light" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
