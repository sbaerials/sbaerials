import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Radio } from "lucide-react";
import { flightClips, getVideoRotation, showcaseReels } from "@/data/content";
import { useVideoReel } from "@/hooks/useVideoReel";

export default function VideoShowcase() {
  const {
    activeIndex,
    isPlaying,
    isMuted,
    progress,
    goToIndex,
    nextClip,
    prevClip,
    togglePlay,
    toggleMute,
    setVideoRef,
    containerRef,
  } = useVideoReel(flightClips, { segmentSeconds: 8, initialMuted: true });

  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const activeReel = showcaseReels[activeIndex] || showcaseReels[0];

  const handleFullscreen = () => {
    if (!playerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      playerWrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section id="showcase" className="bg-panel py-20 md:py-[120px] relative overflow-hidden">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sec-head !pt-0 !pb-0"
          >
            <div className="eyebrow">AERIAL SHOWCASE</div>
            <h2>Every shoot, one reel.</h2>
            <p className="text-steel mt-2 text-sm md:text-base">
              Interactive 4K footage deck. Click any reel tab to scrub directly, or toggle sound to experience full cinematic audio.
            </p>
          </motion.div>

          {/* Quick Stats Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-steel bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full self-start md:self-end"
          >
            <span className="flex items-center gap-1.5 text-brand-light">
              <Radio className="w-3.5 h-3.5 animate-pulse text-brand-light" />
              FLIGHT DECK
            </span>
            <span className="text-white/20">|</span>
            <span>4K CINEMA AT 60FPS</span>
          </motion.div>
        </div>

        {/* Video Cinema Player Card */}
        <motion.div
          ref={playerWrapperRef}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* Continuous Video Stack */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
            {flightClips.map((src, i) => {
              const rotation = getVideoRotation(src);
              return (
                <video
                  key={src}
                  ref={setVideoRef(i)}
                  src={src}
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 will-change-[opacity,transform] ${
                    activeIndex === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  style={{
                    transform: rotation ? `translateZ(0) rotate(${rotation}deg) scale(1.78)` : "translateZ(0)",
                  }}
                />
              );
            })}
          </div>

          {/* Top Telemetry HUD */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-20 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/80 via-black/30 to-transparent">
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              <span className="font-mono text-[10px] tracking-[0.15em] text-cloud uppercase font-semibold">
                REC ● 4K UHD
              </span>
              <span className="text-white/20 font-mono text-[10px]">·</span>
              <span className="font-mono text-[10px] text-brand-light uppercase">
                {activeReel.altitude}
              </span>
            </div>

            <div className="hidden sm:flex items-center bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-sm font-mono text-[10px]">
              <span className="text-brand-light font-semibold tracking-wider">{activeReel.fps}</span>
            </div>
          </div>

          {/* Center Play Button Overlay on Hover/Pause */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-blue/80 hover:bg-brand-blue text-white flex items-center justify-center backdrop-blur-md z-30 transition-transform hover:scale-110 shadow-2xl"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </button>
          )}

          {/* Bottom HUD: Reel Title + Controller Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 bg-gradient-to-t from-[rgba(6,9,17,0.96)] via-[rgba(6,9,17,0.6)] to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* Reel Title & Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none"
              >
                <div className="font-mono text-[11px] tracking-[0.16em] text-brand-light uppercase font-semibold flex items-center gap-2">
                  <span>{activeReel.tag}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-steel">{activeReel.category}</span>
                </div>
                <h3 className="text-lg md:text-2xl font-display font-semibold text-cloud mt-1 tracking-tight">
                  {activeReel.title}
                </h3>
                <p className="text-steel text-xs md:text-sm font-body mt-0.5 max-w-[480px]">
                  {activeReel.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Flight Deck Control Action Bar */}
            <div className="flex items-center gap-2 bg-black/75 backdrop-blur-xl border border-white/15 p-1.5 rounded-md shadow-2xl self-start sm:self-end">
              <button
                onClick={prevClip}
                className="w-8 h-8 rounded flex items-center justify-center text-steel hover:text-cloud hover:bg-white/10 transition-colors"
                title="Previous Reel"
                aria-label="Previous reel"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded flex items-center justify-center text-cloud bg-white/10 hover:bg-brand-blue hover:text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" fill="currentColor" />}
              </button>

              <button
                onClick={nextClip}
                className="w-8 h-8 rounded flex items-center justify-center text-steel hover:text-cloud hover:bg-white/10 transition-colors"
                title="Next Reel"
                aria-label="Next reel"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-4 bg-white/15 mx-1" />

              {/* Sound Toggle Button with animated EQ bars */}
              <button
                onClick={toggleMute}
                className={`px-2.5 h-8 rounded flex items-center gap-2 text-xs font-mono transition-all ${
                  !isMuted
                    ? "bg-brand-blue text-white shadow-[0_0_15px_rgba(43,109,255,0.5)]"
                    : "text-steel hover:text-cloud hover:bg-white/10"
                }`}
                title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[10px] tracking-wider uppercase">MUTED</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="flex items-center gap-0.5">
                      <span className="w-0.5 h-2 bg-white animate-[pulse_0.6s_ease-in-out_infinite]" />
                      <span className="w-0.5 h-3.5 bg-white animate-[pulse_0.4s_ease-in-out_infinite]" />
                      <span className="w-0.5 h-1.5 bg-white animate-[pulse_0.8s_ease-in-out_infinite]" />
                    </span>
                    <span className="hidden sm:inline text-[10px] tracking-wider uppercase">AUDIO ON</span>
                  </>
                )}
              </button>

              <div className="w-px h-4 bg-white/15 mx-1" />

              <button
                onClick={handleFullscreen}
                className="w-8 h-8 rounded flex items-center justify-center text-steel hover:text-cloud hover:bg-white/10 transition-colors"
                title="Fullscreen View"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Interactive Clip Scrubbing Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-4">
          {showcaseReels.map((reel, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={reel.id}
                onClick={() => goToIndex(i)}
                className={`relative text-left p-3.5 rounded-md border transition-all overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-white/[0.08] border-brand-light/50 shadow-[0_0_20px_rgba(43,109,255,0.15)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                {/* Live Progress Bar indicator */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-brand-light/10 transition-[width] duration-150 pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between relative z-10">
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider ${
                      isActive ? "text-brand-light" : "text-steel"
                    }`}
                  >
                    {reel.tag.split(" // ")[0]}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-ping" />
                  )}
                </div>

                <div className="mt-3 relative z-10">
                  <div
                    className={`font-display text-xs font-semibold uppercase leading-snug line-clamp-1 ${
                      isActive ? "text-cloud" : "text-steel"
                    }`}
                  >
                    {reel.title}
                  </div>
                  <div className="font-mono text-[9px] text-steel/80 mt-1 uppercase truncate">
                    {reel.fps}
                  </div>
                </div>

                {/* Bottom Active Glow Accent */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-light shadow-[0_0_8px_#7EB2FF]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
