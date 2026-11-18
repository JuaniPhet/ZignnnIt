"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type ProjectGalleryProps = { title: string; images: string[] };

/**
 * Image grid + lightbox.
 * The lightbox is a native <dialog> opened with showModal(): the browser handles
 * the backdrop, Escape to close, focus trapping and inert background for free.
 */
export default function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const t = useTranslations("projectPage");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length]
  );

  // Arrow keys while the lightbox is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [go]);

  const alt = (i: number) => t("imageAlt", { title, index: i + 1 });

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={t("openImage", { index: i + 1, total: images.length })}
              className="group relative block w-full aspect-[4/3] overflow-hidden rounded-2xl bg-muted cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            >
              <Image
                src={src}
                alt={alt(i)}
                fill
                sizes="(max-width: 540px) 100vw, (max-width: 768px) 50vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={title}
        // Click on the backdrop (the dialog element itself, outside the content) closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto h-dvh w-dvw max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-12" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="relative h-full w-full max-w-6xl">
            <Image src={images[index]} alt={alt(index)} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={close} aria-label={t("close")} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 cursor-pointer">
            <i className="ri-close-large-line" aria-hidden="true"></i>
          </button>
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label={t("previous")} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 cursor-pointer">
                <i className="ri-arrow-left-s-line" aria-hidden="true"></i>
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t("next")} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 cursor-pointer">
                <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80" aria-live="polite">
                {index + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
