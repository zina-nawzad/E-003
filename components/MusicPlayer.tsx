"use client";

import { useRef, useEffect, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa6";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Try autoplay on mount
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current.volume = 0.5;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/music.mp3"
        loop
        preload="auto"
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
          className="group relative size-14 md:size-16 rounded-full
                     bg-gradient-to-br from-primary to-primary/70
                     text-primary-foreground shadow-lg shadow-primary/30
                     flex items-center justify-center
                     transition-all duration-300
                     hover:scale-110 hover:shadow-xl hover:shadow-primary/50
                     active:scale-95
                     ring-2 ring-background/50 backdrop-blur-sm"
        >
          {/* Pulsing ring when playing */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
            </>
          )}

          {/* Icon with rotation when playing */}
          <span className="relative z-10 transition-transform duration-500">
            {isPlaying ? (
              <FaPause className="size-5 md:size-6" />
            ) : (
              <FaMusic className="size-5 md:size-6 animate-pulse" />
            )}
          </span>

          {/* Subtle spinning border when playing */}
          {isPlaying && (
            <span
              className="absolute inset-0 rounded-full border-2 border-transparent
                         border-t-primary-foreground/60 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          )}
        </button>

        {/* Tooltip */}
        <span
          className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3
                     whitespace-nowrap rounded-md bg-foreground/90 text-background
                     px-3 py-1.5 text-xs font-medium
                     opacity-0 translate-x-2
                     transition-all duration-200
                     group-hover:opacity-100 group-hover:translate-x-0"
        >
          {isPlaying ? "Pause" : "Play music"}
        </span>
      </div>
    </>
  );
};

export default MusicPlayer;
