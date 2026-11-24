import type { Media } from "./media";

type TrailerProps = { name: string; trailer: Extract<Media, { kind: "trailer" }> };

/** Starts muted after a click. Firefox cannot play the stream, so it gets the MP4. */
export function Trailer({ name, trailer }: TrailerProps) {
  return (
    <video
      aria-label={`${name} trailer`}
      poster={trailer.src}
      controls
      autoPlay
      muted
      playsInline
      className="absolute inset-0 size-full"
    >
      <source src={trailer.hls} type="application/vnd.apple.mpegurl" />
      <source src={trailer.mp4} type="video/mp4" />
    </video>
  );
}
