import { motion } from "framer-motion";
import { Mail, ShieldCheck, Video, Award, MapPin } from "lucide-react";
import { site } from "@/data/content";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section id="about" className="bg-panel py-[100px] md:py-[140px] relative overflow-hidden border-t border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sec-head !pt-0 max-w-[720px] mb-12 md:mb-16"
        >
          <div className="eyebrow">ABOUT THE PILOT</div>
          <h2>Flying for a living. Capturing perspectives from above.</h2>
          <p>
            Independent aerial cinematography practice based in Chennai, delivering cinematic 4K footage for real estate, commercial films, and special events.
          </p>
        </motion.div>

        {/* Content Grid: Photo + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo & Spec Card Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Pilot Portrait Frame */}
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-void group shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]">
              <img
                src="/images/pilot.jpg"
                alt="SB Aerials Drone Pilot"
                className="w-full aspect-[4/5] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.14em] text-brand-light uppercase bg-void/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-brand-light/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
                <span>CERTIFIED PILOT</span>
              </div>

              {/* Bottom Card HUD Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end font-mono text-[11px] text-steel">
                <div>
                  <div className="text-cloud font-medium text-[15px]">S.B.</div>
                  <div className="text-[10.5px] tracking-widest text-brand-light uppercase mt-0.5">
                    Founder &amp; Chief Pilot
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-brand-light" />
                  <span className="text-cloud font-medium">Chennai, IN</span>
                </div>
              </div>
            </div>

            {/* Quick Tech Specs Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-md border border-white/10 bg-void/60 backdrop-blur-sm">
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-steel flex items-center gap-1.5 mb-1">
                  <Video className="w-3.5 h-3.5 text-brand-light" />
                  <span>CAMERA CRAFT</span>
                </div>
                <div className="font-display text-sm text-cloud font-semibold">4K / 60FPS Cinematic</div>
              </div>

              <div className="p-4 rounded-md border border-white/10 bg-void/60 backdrop-blur-sm">
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-steel flex items-center gap-1.5 mb-1">
                  <Award className="w-3.5 h-3.5 text-brand-light" />
                  <span>FLIGHT HOURS</span>
                </div>
                <div className="font-display text-sm text-cloud font-semibold">340+ Hours Logged</div>
              </div>

              <div className="p-4 rounded-md border border-white/10 bg-void/60 backdrop-blur-sm">
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-steel flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-light" />
                  <span>SAFETY RECORD</span>
                </div>
                <div className="font-display text-sm text-cloud font-semibold">100% Incident Free</div>
              </div>

              <div className="p-4 rounded-md border border-white/10 bg-void/60 backdrop-blur-sm">
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-steel flex items-center gap-1.5 mb-1">
                  <Mail className="w-3.5 h-3.5 text-brand-light" />
                  <span>DIRECT EMAIL</span>
                </div>
                <div className="font-mono text-[11px] text-cloud truncate" title={site.email}>
                  contact.sbaerials@gmail.com
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between h-full pt-2"
          >
            <div className="space-y-6 text-[#C4CBD8] leading-[1.8] text-base md:text-[17px]">
              <p className="text-cloud font-display text-xl md:text-2xl leading-snug font-normal border-l-2 border-brand-light pl-5 py-1">
                "SB Aerials started as a passion for chasing sunrise light and transformed into a full-scale aerial cinematography practice."
              </p>

              <p>
                Every single project—whether it's a sleek real estate walkthrough, a grand wedding film, a commercial launch, or a large-scale land survey—is personally planned, flown, color-graded, and edited by one pilot from start to finish.
              </p>

              <p>
                We don't use generic stock footage or outsourced pilots. Everything showcased on this site was captured on-site on request with strict adherence to flight safety, airspace regulations, and visual excellence.
              </p>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="font-mono text-[11px] tracking-[0.16em] uppercase text-brand-light">
                  WHY CLIENTS TRUST SB AERIALS
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                    <span>Personalized One-on-One Service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                    <span>Fast 48-Hour Turnaround Available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                    <span>Raw + Color-Graded Deliverables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                    <span>Full Airspace Compliance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA & Signature */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-4">
                <Button variant="primary" onClick={() => (window.location.hash = "#bookings")}>
                  Book a Shoot
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => (window.location.href = `mailto:${site.email}`)}
                >
                  Send Email
                </Button>
              </div>

              <div className="font-display text-sm text-cloud">
                S.B.
                <span className="block font-mono text-[10.5px] text-steel mt-0.5 tracking-wider">
                  Founder &amp; Chief Pilot · SB Aerials
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
