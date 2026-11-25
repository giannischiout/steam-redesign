"use client";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

type MediaViewerProps = { name: string; video: string | null; shots: string[] };

/**
 * The trailer first, then the screenshots. The video is Steam's short preview loop,
 * muted, with the browser's own controls. It never starts by itself.
 */
export function MediaViewer({ name, video, shots }: MediaViewerProps) {
  const items = [
    ...(video ? [{ kind: "video" as const, src: video, thumb: shots[0] }] : []),
    ...shots.slice(0, video ? 5 : 6).map((shot) => ({ kind: "image" as const, src: shot, thumb: shot })),
  ];
  const [index, setIndex] = useState(0);
  const item = items[index];
  if (!item) return null;

  return (
    <div className="grid content-start gap-2">
      <div className="relative aspect-video overflow-hidden rounded-media bg-media">
        {item.kind === "video" ? (
          <video
            src={item.src}
            poster={shots[0]}
            aria-label={`${name} preview`}
            controls
            muted
            loop
            playsInline
            preload="none"
            className="size-full object-cover"
          />
        ) : (
          <Image
            key={item.src}
            src={item.src}
            alt={`${name}, screenshot ${video ? index : index + 1}`}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="fade-in object-cover"
          />
        )}
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {items.map((entry, position) => (
          <li key={`${entry.kind}-${entry.src}`}>
            <button
              type="button"
              aria-label={entry.kind === "video" ? "Preview video" : `Screenshot ${video ? position : position + 1}`}
              aria-pressed={position === index}
              onClick={() => setIndex(position)}
              className="relative block aspect-video w-full cursor-pointer overflow-hidden rounded-thumb bg-media hover:brightness-110 aria-pressed:ring-2 aria-pressed:ring-text-strong"
            >
              {entry.thumb && <Image src={entry.thumb} alt="" fill sizes="(min-width: 640px) 12vw, 33vw" className="object-cover" />}
              {entry.kind === "video" && (
                <span className="absolute inset-0 m-auto grid size-8 place-content-center rounded-full bg-page text-text-strong">
                  <IconPlayerPlayFilled aria-hidden="true" size={16} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
