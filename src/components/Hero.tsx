import { motion } from "framer-motion";
import { heroClipOrder, getVideoRotation } from "@/data/content";
import { useVideoReel } from "@/hooks/useVideoReel";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { activeIndex, setVideoRef, containerRef } = useVideoReel(heroClipOrder, { segmentSeconds: 9 });

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
      </div>
      <div className="absolute inset-0 z-[1] bg-hero-scrim" />

      <div className="wrap !px-0 flex flex-col flex-1 pt-5 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex justify-between items-start font-mono text-[11px] text-steel tracking-[0.08em] pb-9 flex-col md:flex-row gap-4 md:gap-0"
        >
          <div className="flex flex-col gap-1">
            <span>LOCATION</span>
            <b className="text-cloud text-[13px] font-medium">CHENNAI, IN</b>
          </div>
          <div className="flex flex-col gap-1 md:text-center">
            <span>STATUS</span>
            <b className="text-cloud text-[13px] font-medium">BOOKING OPEN</b>
          </div>
          <div className="flex flex-col gap-1 md:text-right">
            <span>OUTPUT</span>
            <b className="text-cloud text-[13px] font-medium">4K CINEMATIC</b>
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
