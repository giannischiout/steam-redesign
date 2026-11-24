type TopSellerBadgeProps = { rank: number };

export function TopSellerBadge({ rank }: TopSellerBadgeProps) {
  return (
    <span aria-hidden="true" className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-page py-1.5 pr-4 pl-3 text-sm font-semibold text-text-strong">
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
        <path fill="currentColor" d="M2 17h5v5H2zM9.5 14h5v8h-5zM17 10.5h5V22h-5z" />
        <path
          stroke="var(--color-discount)"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          d="M1.5 13.5 8 7.5l4 3.5 8-7.5M14.5 2.8H21v6.4"
        />
      </svg>
      Top seller #{rank}
    </span>
  );
}
