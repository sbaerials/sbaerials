import { useEffect, useRef, useState, useCallback } from "react";

interface UseVideoReelOptions {
  /** Cap how long each clip plays before crossfading (seconds). Omit for full length. */
  segmentSeconds?: number;
  initialMuted?: boolean;
}

/**
 * Drives a continuous, crossfading playback loop across a list of video clips.
 * Provides interactive controls (scrubbing, audio toggle, play/pause, progress tracking).
 * Automatically pauses playback when out of viewport to preserve GPU/CPU performance.
 */
export function useVideoReel(clips: string[], options: UseVideoReelOptions = {}) {
  const { segmentSeconds, initialMuted = true } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const switchingRef = useRef(false);

  const setVideoRef = useCallback((i: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[i] = el;
    if (el) {
      el.muted = isMuted;
    }
  }, [isMuted]);

  // Jump directly to a clip
  const goToIndex = useCallback((idx: number) => {
    if (idx < 0 || idx >= clips.length) return;
    setActiveIndex(idx);
    setProgress(0);
  }, [clips.length]);

  const nextClip = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % clips.length);
    setProgress(0);
  }, [clips.length]);

  const prevClip = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + clips.length) % clips.length);
    setProgress(0);
  }, [clips.length]);

  const togglePlay = useCallback(() => {
    const activeEl = videoRefs.current[activeIndex];
    if (!activeEl) return;
    if (activeEl.paused) {
      activeEl.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      activeEl.pause();
      setIsPlaying(false);
    }
  }, [activeIndex]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      videoRefs.current.forEach((el) => {
        if (el) el.muted = nextMuted;
      });
      // If unmuting, try to play current active video with audio
      const activeEl = videoRefs.current[activeIndex];
      if (!nextMuted && activeEl && activeEl.paused) {
        activeEl.play().catch(() => {});
      }
      return nextMuted;
    });
  }, [activeIndex]);

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
          if (isVisible && isPlaying) {
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
  }, [activeIndex, isPlaying]);

  // Handle active clip playback & pause all inactive clips
  useEffect(() => {
    switchingRef.current = false;
    videoRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.muted = isMuted;
      if (idx === activeIndex) {
        if (isVisibleRef.current && isPlaying) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      } else {
        el.pause();
      }
    });
    setProgress(0);
  }, [activeIndex, isMuted, isPlaying]);

  // Handle clip progression timer and live progress percentage
  useEffect(() => {
    if (!clips.length) return;

    let timerId: number | null = null;
    let rAFId: number | null = null;
    const startTime = Date.now();

    const advance = () => {
      if (switchingRef.current) return;
      switchingRef.current = true;
      setActiveIndex((i) => (i + 1) % clips.length);
      setProgress(0);
    };

    if (segmentSeconds && segmentSeconds > 0) {
      const durationMs = segmentSeconds * 1000;
      const updateProgress = () => {
        if (!isPlaying || !isVisibleRef.current) {
          rAFId = requestAnimationFrame(updateProgress);
          return;
        }
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, (elapsed / durationMs) * 100);
        setProgress(pct);
        if (elapsed >= durationMs) {
          advance();
          return;
        }
        rAFId = requestAnimationFrame(updateProgress);
      };
      rAFId = requestAnimationFrame(updateProgress);
    } else {
      const activeEl = videoRefs.current[activeIndex];
      const checkProgress = () => {
        if (isVisibleRef.current && activeEl && isPlaying) {
          const dur = activeEl.duration || 30;
          const cur = activeEl.currentTime || 0;
          setProgress(Math.min(100, (cur / dur) * 100));

          const cap = dur - 0.5;
          if (activeEl.ended || cur >= cap) {
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
  }, [activeIndex, clips.length, segmentSeconds, isPlaying]);

  return {
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
  };
}
