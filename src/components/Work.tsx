import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, MapPin } from "lucide-react";
import { projects, projectCategories, getVideoRotation } from "@/data/content";

interface WorkProps {
  onOpen: (src: string) => void;
}

export default function Work({ onOpen }: WorkProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="bg-void pb-20 md:pb-28">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="sec-head !pb-0"
          >
            <div className="eyebrow">SELECTED WORK</div>
            <h2>Projects, from above.</h2>
            <p>Hover a project to preview clip, click to watch in full cinema mode.</p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap gap-2 self-start md:self-end"
          >
            {projectCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-brand-blue border-brand-light text-white shadow-[0_0_15px_rgba(43,109,255,0.4)]"
                      : "bg-white/[0.03] border-white/10 text-steel hover:text-cloud hover:border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((p, i) => {
              const rotation = getVideoRotation(p.src);
              return (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className="card group relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer border border-white/10 bg-black shadow-xl"
                  onMouseEnter={() => videoRefs.current[p.id]?.play().catch(() => {})}
                  onMouseLeave={() => {
                    const v = videoRefs.current[p.id];
                    if (v) {
                      v.pause();
                      v.currentTime = 0;
                    }
                  }}
                  onClick={() => onOpen(p.src)}
                >
                  <video
                    ref={(el) => (videoRefs.current[p.id] = el)}
                    src={p.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-105"
                    style={
                      rotation
                        ? { transform: `translateZ(0) rotate(${rotation}deg) scale(1.78)` }
                        : undefined
                    }
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="font-mono text-[9px] tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-sm text-brand-light font-semibold">
                      {p.categoryLabel}
                    </span>
                    <span className="font-mono text-[9px] tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-sm text-steel flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-brand-light" />
                      AUDIO
                    </span>
                  </div>

                  {/* Bottom Info Gradient Scrim */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none bg-gradient-to-t from-[rgba(6,9,17,0.96)] via-[rgba(6,9,17,0.4)] to-transparent z-10 transition-opacity duration-300">
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-steel">
                      <MapPin className="w-3 h-3 text-brand-light shrink-0" />
                      <span>{p.location}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-brand-light">{p.altitude} ALT</span>
                    </div>
                    <div className="font-display font-semibold text-lg md:text-xl text-cloud mt-1.5 leading-snug group-hover:text-brand-light transition-colors">
                      {p.title}
                    </div>
                    <p className="font-body text-xs text-steel mt-1 line-clamp-1">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Center Floating Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/40 bg-black/40 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-md pointer-events-none z-20 shadow-2xl">
                    <Play className="w-5 h-5 text-cloud ml-0.5" fill="currentColor" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
