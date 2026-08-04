import { motion } from "framer-motion";
import { stats } from "@/data/content";

export default function Stats() {
  return (
    <section className="bg-panel py-20 border-y border-white/10">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
          >
            <b className="font-display text-[30px] md:text-[46px] text-cloud block">{s.value}</b>
            <span className="font-mono text-[11px] tracking-[0.1em] text-steel uppercase">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
