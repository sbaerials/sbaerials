import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { heroClipOrder, getVideoRotation } from "@/data/content";
import { useVideoReel } from "@/hooks/useVideoReel";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { activeIndex, isMuted, toggleMute, setVideoRef, containerRef } = useVideoReel(heroClipOrder, {
    segmentSeconds: 9,
    initialMuted: true,
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end pt-[150px] px-6 md:px-12 overflow-hidden"
    >
      {/* Continuous crossfading reel — replaces the old static hero image */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black overflow-hidden">
        {heroClipOrder.map((src, i) => {
          const rotation = getVideoRotation(src);
          return (
            <video
              key={src}
              ref={setVideoRef(i)}
              src={src}
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 will-change-[opacity,transform] ${
                activeIndex === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                transform: rotation ? `translateZ(0) rotate(${rotation}deg) scale(1.78)` : "translateZ(0)",
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-0 z-[1] bg-hero-scrim" />

      {/* Floating Audio Immersion Pill */}
      <div className="absolute top-[100px] md:top-[120px] right-6 md:right-12 z-20">
        <button
          onClick={toggleMute}
          className={`px-3.5 py-1.5 rounded-full border backdrop-blur-md font-mono text-[10px] md:text-[11px] tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer ${
            !isMuted
              ? "bg-brand-blue/30 border-brand-light text-cloud shadow-[0_0_20px_rgba(43,109,255,0.4)]"
              : "bg-black/50 border-white/15 text-steel hover:text-cloud hover:border-white/30"
          }`}
          title={isMuted ? "Turn on cinematic sound" : "Mute sound"}
          aria-label={isMuted ? "Turn on cinematic sound" : "Mute sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-brand-light" />
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-2 bg-brand-light animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 h-3 bg-brand-light animate-[pulse_0.4s_ease-in-out_infinite]" />
                <span className="w-0.5 h-1.5 bg-brand-light animate-[pulse_0.7s_ease-in-out_infinite]" />
              </span>
              <span className="text-brand-light font-semibold">SOUND ON</span>
            </>
          )}
        </button>
      </div>

      <div className="wrap !px-0 flex flex-col flex-1 pt-5 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex justify-between items-start font-mono text-[11px] text-steel tracking-[0.08em] pb-9 flex-col md:flex-row gap-4 md:gap-0"
        >
          <div className="flex flex-col gap-1">
            <span>LOCATION</span>
            <b className="text-cloud text-[13px] font-medium">CHENNAI, IN (13.08° N, 80.27° E)</b>
          </div>
          <div className="flex flex-col gap-1 md:text-center">
            <span>STATUS</span>
            <b className="text-cloud text-[13px] font-medium flex items-center justify-start md:justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              BOOKING OPEN · 2026
            </b>
          </div>
          <div className="flex flex-col gap-1 md:text-right">
            <span>OUTPUT</span>
            <b className="text-cloud text-[13px] font-medium">4K/60 CINEMATIC</b>
          </div>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative z-[2] pb-[70px]"
        >
          <div className="eyebrow">CURRENTLY BOOKING — 2026 SEASON</div>
          <h1 className="text-[38px] md:text-[84px] uppercase text-cloud mt-2 leading-[1.05]">
            CAPTURING <em className="not-italic text-brand-light">EVERY ANGLE.</em>
            <br />
            CREATING EVERY
            <br />
            PERSPECTIVE.
          </h1>
          <p className="font-display text-base md:text-xl text-steel mt-3.5 font-normal">
            Professional Drone Photography &amp; Videography
          </p>
          <p className="max-w-[520px] mt-5 text-base leading-relaxed text-steel">
            SB Aerials is an independent aerial cinematography practice based in Chennai —
            real estate, weddings, events, and commercial coverage, flown and edited personally.
          </p>
          <div className="flex gap-4 mt-9 flex-wrap">
            <Button variant="primary" onClick={() => (window.location.hash = "#bookings")}>
              Book a Shoot
            </Button>
            <Button variant="ghost" onClick={() => (window.location.hash = "#work")}>
              Watch Our Work
            </Button>
          </div>
        </motion.div>

        <div className="relative z-[2] flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-steel py-6 uppercase">
          <span>Scroll to explore</span>
          <div className="w-[34px] h-px bg-steel relative overflow-hidden">
            <span className="absolute -left-full w-full h-full bg-brand-light animate-[scrollCue_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
