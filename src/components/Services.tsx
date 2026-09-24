import { motion } from "framer-motion";
import {
  Heart,
  Building2,
  HardHat,
  Compass,
  Sprout,
  PartyPopper,
  Film,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/data/content";

const serviceIcons: Record<string, typeof Film> = {
  "Wedding Photography": Heart,
  "Real Estate": Building2,
  "Construction Monitoring": HardHat,
  "Land Survey": Compass,
  "Agriculture Survey": Sprout,
  "Event Coverage": PartyPopper,
  "Cinematic Videos": Film,
  "Commercial Shoots": Briefcase,
};

export default function Services() {
  const handleSelectService = (title: string) => {
    const bookingSec = document.getElementById("bookings");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth" });
      const selectEl = document.querySelector('select[name="service"]') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = title;
      }
    }
  };

  return (
    <section className="bg-void pb-16">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head"
        >
          <div className="eyebrow">CAPABILITIES &amp; SERVICES</div>
          <h2>What I fly for.</h2>
          <p>
            From high-altitude cinematic establishing shots to millimeter-accurate survey passes, tailored to your production scope.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          {services.map((service, i) => {
            const IconComponent = serviceIcons[service.title] || Film;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: "easeOut" }}
                onClick={() => handleSelectService(service.title)}
                className="group relative bg-void hover:bg-[#0c1222] transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Subtle Border Highlight on Hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#7EB2FF]" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-sm bg-white/[0.03] border border-white/10 flex items-center justify-center text-brand-light group-hover:border-brand-light/50 group-hover:bg-brand-blue/10 transition-all">
                      <IconComponent className="w-5 h-5 text-brand-light" />
                    </div>
                    <span className="font-mono text-[11px] text-steel/60 group-hover:text-brand-light transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-[19px] mt-6 uppercase font-display font-semibold text-cloud group-hover:text-brand-light transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-steel text-[13.5px] mt-2.5 leading-relaxed font-body">
                    {service.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-[10px] tracking-wider text-steel group-hover:text-cloud transition-colors uppercase">
                  <span>Enquire Shoot</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-steel group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
