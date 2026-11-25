// Real studios. Who is followed, and why others are suggested, is made up for the demo player.
type Creator = { name: string; reason: string; isFollowed: boolean };

export const creators: Creator[] = [
  { name: "Supergiant Games", reason: "You follow them", isFollowed: true },
  { name: "FromSoftware, Inc.", reason: "Because you played Hollow Knight", isFollowed: false },
  { name: "Annapurna Interactive", reason: "Because you played Journey", isFollowed: false },
];
