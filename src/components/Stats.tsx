import { motion } from "framer-motion";
import { stats } from "@/data/content";

export default function Stats() {
  return (
    <section className="bg-[#080d19] py-16 md:py-24 border-y border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="wrap relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
            className="p-6 md:p-8 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-light group-hover:shadow-[0_0_8px_#7EB2FF] transition-shadow" />
              <span className="font-mono text-[9px] tracking-widest text-steel/50 uppercase">
                METRIC // 0{i + 1}
              </span>
            </div>
            <b className="font-display font-bold text-3xl md:text-5xl text-cloud block tracking-tight group-hover:text-brand-light transition-colors">
              {s.value}
            </b>
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.12em] text-steel uppercase block mt-2 font-medium">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
