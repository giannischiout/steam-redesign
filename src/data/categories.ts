// Tags are Steam's own names. Favourites are made up for the demo player, and come first.
export type Category = { name: string; slug: string; tag: string; posterId: number; isFavorite?: boolean };

export const categories: Category[] = [
  { name: "Roguelike", slug: "roguelike", tag: "Roguelike", posterId: 1145350, isFavorite: true },
  { name: "Metroidvania", slug: "metroidvania", tag: "Metroidvania", posterId: 367520, isFavorite: true },
  { name: "Open world", slug: "open-world", tag: "Open World", posterId: 1174180, isFavorite: true },
  { name: "Deckbuilder", slug: "deckbuilder", tag: "Deckbuilding", posterId: 646570, isFavorite: true },
  { name: "Co-op", slug: "co-op", tag: "Co-op", posterId: 2001120, isFavorite: true },
  { name: "Farming sim", slug: "farming-sim", tag: "Farming Sim", posterId: 413150, isFavorite: true },
  { name: "Story rich", slug: "story-rich", tag: "Story Rich", posterId: 1903340, isFavorite: true },
  { name: "Souls-like", slug: "souls-like", tag: "Souls-like", posterId: 1245620 },
  { name: "Cozy", slug: "cozy", tag: "Cozy", posterId: 638230 },
  { name: "Puzzle", slug: "puzzle", tag: "Puzzle", posterId: 620 },
  { name: "Horror", slug: "horror", tag: "Horror", posterId: 1092790 },
  { name: "Strategy", slug: "strategy", tag: "Strategy", posterId: 427520 },
];

export const favoriteCategories = categories.filter((category) => category.isFavorite);
