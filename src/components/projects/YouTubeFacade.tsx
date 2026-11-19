"use client"

import { useState } from "react";

type YouTubeFacadeProps = {
  videoId: string;
  /** Accessible label of the play button, e.g. "Play the video: Pasteefy". */
  playLabel: string;
};

/**
 * Lightweight YouTube embed ("facade" pattern).
 * The real YouTube iframe weighs ~1 MB of scripts and sets cookies. Until the visitor
 * clicks, we only show the video thumbnail (a single image) and a brand play button.
 * On click we swap in the iframe from youtube-nocookie.com with autoplay=1.
 */
export default function YouTubeFacade({ videoId, playLabel }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault doesn't exist for every video: fall back to hqdefault (always present).
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-carbon shadow-xl">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={playLabel}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, lazy-loaded */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              // YouTube serves a 120px grey placeholder instead of a 404 when maxres is missing.
              if (e.currentTarget.naturalWidth <= 120 && thumb.includes("maxres")) {
                setThumb(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
              }
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8 translate-x-0.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.93-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
