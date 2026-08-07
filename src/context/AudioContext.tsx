import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { soundEngine } from "@/utils/soundEngine";

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolumeState] = useState(0.7);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        soundEngine.stop();
      } else {
        soundEngine.setVolume(volume);
        soundEngine.start();
      }
      return next;
    });
  }, [volume]);

  const setMuted = useCallback(
    (muted: boolean) => {
      setIsMuted(muted);
      if (muted) {
        soundEngine.stop();
      } else {
        soundEngine.setVolume(volume);
        soundEngine.start();
      }
    },
    [volume]
  );

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    soundEngine.setVolume(newVol);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundEngine.stop();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isMuted, volume, toggleMute, setMuted, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
