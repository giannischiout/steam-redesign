const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCount(value: number) {
  return compact.format(value);
}

/** "RPG · Adventure · Aug 2023" */
export function formatFacts(genres: string[], released: string): string {
  return [...genres, released].filter(Boolean).join(" · ");
}
