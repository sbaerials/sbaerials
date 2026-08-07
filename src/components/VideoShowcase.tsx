import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { flightClips, getVideoRotation } from "@/data/content";
import { useVideoReel } from "@/hooks/useVideoReel";
import { useAudio } from "@/context/AudioContext";

export default function VideoShowcase() {
  const { activeIndex, setVideoRef, containerRef } = useVideoReel(flightClips);
  const { isMuted, toggleMute } = useAudio();

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
          className="relative w-full aspect-video rounded-md overflow-hidden bg-black border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] group"
        >
          {flightClips.map((src, i) => {
            const rotation = getVideoRotation(src);
            return (
              <video
                key={src}
                ref={setVideoRef(i)}
                src={src}
                muted={isMuted}
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

          <button
            onClick={toggleMute}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-cloud hover:text-brand-light hover:border-brand-light/50 transition-all cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-steel" />
                <span className="text-[11px] font-mono tracking-wider">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-brand-light animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider text-brand-light">SOUND ON</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
