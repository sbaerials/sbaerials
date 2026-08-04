import { motion } from "framer-motion";
import { services } from "@/data/content";

export default function Services() {
  return (
    <section className="bg-void pb-5">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head"
        >
          <div className="eyebrow">SERVICES</div>
          <h2>What I fly for.</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-md overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: "easeOut" }}
              className="bg-void hover:bg-panel transition-colors px-7 py-9"
            >
              <div className="font-mono text-[11px] text-brand-light tracking-[0.1em]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[19px] mt-4 uppercase">{service.title}</h3>
              <p className="text-steel text-sm mt-2.5 leading-relaxed">{service.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
