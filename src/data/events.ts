// What "Discounts and events" shows. Prices and discounts come from games.json; the choice
// of event and the "Today" and "Midweek" labels are made up for the concept.

/** The big one: a publisher's games that are on sale. `leadId` and `leadShot` pick its picture. */
export const publisherSale = {
  publisher: "PlayStation Publishing LLC",
  title: "PlayStation Publishing",
  kicker: "Publisher sale",
  leadId: 2215430,
  leadShot: 1,
};

export const spotlightDeals: { gameId: number; label: string }[] = [
  { gameId: 1426210, label: "Today's deal" },
  { gameId: 1172380, label: "Today's deal" },
  { gameId: 2183900, label: "Midweek deal" },
  { gameId: 668580, label: "Midweek deal" },
];
