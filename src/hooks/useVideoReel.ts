import { useEffect, useRef, useState, useCallback } from "react";

interface UseVideoReelOptions {
  /** Cap how long each clip plays before crossfading (seconds). Omit for full length. */
  segmentSeconds?: number;
}

/**
 * Drives a continuous, crossfading playback loop across a list of video clips.
 * Automatically pauses playback when out of viewport to preserve GPU/CPU performance.
 */
export function useVideoReel(clips: string[], options: UseVideoReelOptions = {}) {
  const { segmentSeconds } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const switchingRef = useRef(false);

  const setVideoRef = useCallback((i: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[i] = el;
  }, []);

  // IntersectionObserver to pause playback when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;
        isVisibleRef.current = isVisible;

        const activeEl = videoRefs.current[activeIndex];
        if (activeEl) {
          if (isVisible) {
            activeEl.play().catch(() => {});
          } else {
            activeEl.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex]);

  // Handle active clip playback & pause all inactive clips
  useEffect(() => {
    switchingRef.current = false;
    videoRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === activeIndex) {
        if (isVisibleRef.current) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      } else {
        el.pause();
      }
    });
  }, [activeIndex]);

  // Handle clip progression timer safely without firing continuous state updates
  useEffect(() => {
    if (!clips.length) return;

    let timerId: number | null = null;
    let rAFId: number | null = null;

    const advance = () => {
      if (switchingRef.current) return;
      switchingRef.current = true;
      setActiveIndex((i) => (i + 1) % clips.length);
    };

    const activeEl = videoRefs.current[activeIndex];

    if (segmentSeconds && segmentSeconds > 0) {
      timerId = window.setTimeout(advance, segmentSeconds * 1000);
    } else if (activeEl) {
      const checkProgress = () => {
        if (isVisibleRef.current && activeEl) {
          const cap = (activeEl.duration || Infinity) - 0.5;
          if (activeEl.ended || activeEl.currentTime >= cap) {
            advance();
            return;
          }
        }
        rAFId = requestAnimationFrame(checkProgress);
      };
      rAFId = requestAnimationFrame(checkProgress);
    }

    return () => {
      if (timerId !== null) clearTimeout(timerId);
      if (rAFId !== null) cancelAnimationFrame(rAFId);
    };
  }, [activeIndex, clips.length, segmentSeconds]);

  return { activeIndex, setVideoRef, containerRef };
}
