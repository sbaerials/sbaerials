import { motion } from "framer-motion";
import { Award, ShieldCheck, Video, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section id="about" className="bg-void py-24 md:py-[120px] relative border-t border-white/10">
      <div className="wrap">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head !pt-0 max-w-[760px]"
        >
          <div className="eyebrow">ABOUT THE PILOT</div>
          <h2>Precision in Every Flight.</h2>
          <p>
            Licensed drone operator delivering high-resolution aerial cinematography for weddings, real estate, and events across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-16 items-center mt-12">
          {/* Owner Portrait Card */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative group"
          >
            <div className="relative rounded-md overflow-hidden border border-brand-blue/30 bg-white/5 aspect-[4/5] shadow-2xl">
              <img
                src="/images/pilot.jpg"
                alt="Sathik Basha — Licensed Drone Pilot"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-90" />

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-md bg-void/80 backdrop-blur-md border border-white/10 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-brand-blue/20 border border-brand-light/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-light" />
                </div>
                <div>
                  <div className="font-display font-bold text-cloud text-base leading-none">
                    Sathik Basha
                  </div>
                  <div className="font-mono text-[10px] tracking-wider text-brand-light mt-1 uppercase font-semibold">
                    Licensed Drone Pilot · 2+ Yrs Exp.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Details Content */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl uppercase font-display tracking-tight text-cloud">
                Meet Sathik Basha
              </h3>
              <p className="text-brand-light font-mono text-xs tracking-wider uppercase">
                Founder &amp; Certified Lead Drone Operator
              </p>
            </div>

            <p className="text-steel text-[15px] leading-relaxed">
              Hello, my name is <b className="text-cloud font-normal">Sathik Basha</b>. I am a certified drone pilot with over <b className="text-cloud font-normal">2+ years of professional experience</b> specializing in aerial filming for weddings, commercial events, real estate, and site coverage across Chennai and India.
            </p>

            <p className="text-steel text-[15px] leading-relaxed">
              Whether capturing emotional moments at a wedding, establishing dynamic perspectives for commercial projects, or conducting precise aerial coverage for events and surveys, every flight is executed with strict safety standards and cinematic precision.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-sm border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <Award className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-xs text-cloud uppercase">2+ Years Exp.</div>
                  <div className="font-mono text-[10px] text-steel mt-0.5">Proven Flight Record</div>
                </div>
              </div>

              <div className="p-4 rounded-sm border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-xs text-cloud uppercase">Licensed Pilot</div>
                  <div className="font-mono text-[10px] text-steel mt-0.5">DGCA Compliant</div>
                </div>
              </div>

              <div className="p-4 rounded-sm border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <Video className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-xs text-cloud uppercase">4K/60fps Quality</div>
                  <div className="font-mono text-[10px] text-steel mt-0.5">Cinematic Footage</div>
                </div>
              </div>

              <div className="p-4 rounded-sm border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-xs text-cloud uppercase">India</div>
                  <div className="font-mono text-[10px] text-steel mt-0.5">On-Location Coverage</div>
                </div>
              </div>
            </div>

            {/* Guarantee Checkmarks */}
            <div className="space-y-2 pt-2 text-xs font-mono text-steel">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-light" />
                <span>Wedding &amp; Event Aerial Cinematography</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-light" />
                <span>Real Estate Walkthroughs &amp; Land Surveys</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-light" />
                <span>Fast 24–48 Hour Footage Delivery</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Button variant="primary" onClick={() => (window.location.hash = "#bookings")}>
                Book a Shoot
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
