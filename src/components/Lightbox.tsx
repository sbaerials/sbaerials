import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getVideoRotation } from "@/data/content";

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rotation = src ? getVideoRotation(src) : 0;

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
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
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[1100px] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-11 right-0 font-mono text-xs tracking-[0.1em] uppercase text-cloud hover:text-brand-light flex items-center gap-2"
            >
              Close <X className="w-3.5 h-3.5" />
            </button>
            <video
              key={src}
              ref={videoRef}
              src={src}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full max-h-[82vh] rounded-md bg-black object-contain shadow-2xl"
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
