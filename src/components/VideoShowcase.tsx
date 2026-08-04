import { motion } from "framer-motion";
import { flightClips, getVideoRotation } from "@/data/content";
import { useVideoReel } from "@/hooks/useVideoReel";

export default function VideoShowcase() {
  const { activeIndex, setVideoRef, containerRef } = useVideoReel(flightClips);

  return (
    <section id="showcase" className="bg-panel py-24 md:py-[130px]">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="sec-head !pt-0"
        >
          <div className="eyebrow">VIDEO SHOWCASE</div>
          <h2>Every shoot, one reel.</h2>
          <p>Plays automatically, cycling through the latest footage.</p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-md overflow-hidden bg-black border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
        >
          {flightClips.map((src, i) => {
            const rotation = getVideoRotation(src);
            return (
              <video
                key={src}
                ref={setVideoRef(i)}
                src={src}
                muted
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 will-change-[opacity,transform] ${
                  activeIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  transform: rotation ? `translateZ(0) rotate(${rotation}deg) scale(1.78)` : "translateZ(0)",
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
