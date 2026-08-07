import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";
import { getVideoRotation } from "@/data/content";
import { useAudio } from "@/context/AudioContext";

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  const rotation = src ? getVideoRotation(src) : 0;
  const { isMuted, setMuted, toggleMute } = useAudio();

  useEffect(() => {
    if (src) {
      // Auto-unmute when user opens a project in lightbox
      setMuted(false);
    }
  }, [src, setMuted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-[rgba(6,9,17,0.94)] flex items-center justify-center p-6 md:p-10 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[1100px] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3">
              <button
                onClick={toggleMute}
                className="font-mono text-xs tracking-[0.1em] uppercase text-cloud hover:text-brand-light flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-steel" /> Sound Off
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-brand-light animate-pulse" /> Sound Playing
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="font-mono text-xs tracking-[0.1em] uppercase text-cloud hover:text-brand-light flex items-center gap-2 cursor-pointer"
              >
                Close <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <video
              src={src}
              controls
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full max-h-[82vh] rounded-md bg-black object-contain border border-white/10"
              style={{
                transform: rotation ? `rotate(${rotation}deg)` : undefined,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
