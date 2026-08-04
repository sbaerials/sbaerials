import { useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { projects, getVideoRotation } from "@/data/content";

interface WorkProps {
  onOpen: (src: string) => void;
}

export default function Work({ onOpen }: WorkProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <section id="work" className="bg-void pb-16">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head"
        >
          <div className="eyebrow">SELECTED WORK</div>
          <h2>Projects, from above.</h2>
          <p>Hover a project to preview, click to watch in full.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const rotation = getVideoRotation(p.src);
            return (
              <motion.div
                key={p.src}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                className="card group relative aspect-[4/5] rounded-md overflow-hidden cursor-pointer border border-white/10 bg-black"
                onMouseEnter={() => videoRefs.current[i]?.play().catch(() => {})}
                onMouseLeave={() => {
                  const v = videoRefs.current[i];
                  if (v) {
                    v.pause();
                    v.currentTime = 0;
                  }
                }}
                onClick={() => onOpen(p.src)}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={p.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                  style={{
                    transform: rotation ? `translateZ(0) rotate(${rotation}deg) scale(1.78)` : "translateZ(0)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none bg-gradient-to-t from-[rgba(6,9,17,0.92)] via-transparent to-transparent z-10">
                  <div className="font-mono text-[10px] tracking-[0.1em] text-brand-light uppercase">
                    {p.label}
                  </div>
                  <div className="font-display text-[19px] mt-1.5">{p.title}</div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/60 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-md pointer-events-none z-10">
                  <Play className="w-4 h-4 text-cloud ml-0.5" fill="currentColor" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
