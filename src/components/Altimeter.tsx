import { useEffect, useState, useRef } from "react";

export default function Altimeter() {
  const [progress, setProgress] = useState(0);
  const rAFRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rAFRef.current !== null) return;
      rAFRef.current = requestAnimationFrame(() => {
        rAFRef.current = null;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const newProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setProgress((prev) => (Math.abs(prev - newProgress) > 0.001 ? newProgress : prev));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rAFRef.current !== null) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  const meters = String(Math.round(progress * 4200)).padStart(4, "0");

  return (
    <div className="hidden md:flex fixed right-7 top-1/2 -translate-y-1/2 z-[90] flex-col items-center gap-3.5 font-mono text-[10px] text-steel">
      <span className="[writing-mode:vertical-rl] tracking-[0.15em]">
        ALT <span className="text-brand-light">{meters}</span>M
      </span>
      <div className="w-px h-[180px] bg-white/10 relative">
        <div
          className="absolute bottom-0 left-0 w-full bg-brand-light transition-[height] duration-150"
          style={{ height: `${progress * 100}%`, boxShadow: "0 0 6px #7EB2FF" }}
        />
      </div>
    </div>
  );
}
