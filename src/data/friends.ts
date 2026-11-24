// Made-up friends for the demo player. Game ids come from games.json.
type Friend = { name: string; gameId: number; isPlaying: boolean; note: string };

export const friends: Friend[] = [
  { name: "Mara", gameId: 1086940, isPlaying: true, note: "Playing now" },
  { name: "Tomek", gameId: 367520, isPlaying: true, note: "Playing now" },
  { name: "Ines", gameId: 413150, isPlaying: false, note: "Played 2 hours ago" },
  { name: "Oskar", gameId: 1245620, isPlaying: false, note: "Played yesterday" },
];
