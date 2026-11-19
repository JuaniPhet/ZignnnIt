"use client"

import { useEffect, useRef, useState } from "react";

type CoverLoopProps = { mp4: string; webm: string; poster: string; label: string };

/**
 * Short muted loop (< 2 MB, self-hosted) used instead of a still cover.
 * - preload="none" + IntersectionObserver: nothing is downloaded until the video is on screen.
 * - prefers-reduced-motion: only the poster image is shown.
 * - muted + playsInline are required for autoplay on mobile browsers.
 */
export default function CoverLoop({ mp4, webm, poster, label }: CoverLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element -- poster fallback
    return <img src={poster} alt={label} className="h-full w-full object-cover" />;
  }

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label} className="h-full w-full object-cover">
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
