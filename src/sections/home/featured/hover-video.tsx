import { useState } from "react";
import { cn } from "@/lib/cn";

type HoverVideoProps = { src: string };

/** Silent, no controls. The picture stays below until the video can play. */
export function HoverVideo({ src }: HoverVideoProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setIsReady(true)}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-300",
        isReady ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
