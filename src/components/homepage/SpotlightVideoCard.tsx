"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function SpotlightVideoCard({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div 
      className="w-full aspect-[9/16] rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-black relative group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
      />
      {/* Premium Glassmorphic Play/Pause Button Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-300 ${
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      }`}>
        <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-white/40">
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </div>
      </div>
    </div>
  );
}
