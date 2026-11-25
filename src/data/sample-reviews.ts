// Made-up reviews by made-up players, shown as such on the page. They say nothing
// specific about any game, so they cannot claim something false about one.
export type SampleReview = { player: string; hours: number; isRecommended: boolean; quote: string };

export const positiveReviews: SampleReview[] = [
  { player: "Noor", hours: 31, isRecommended: true, quote: "I meant to play for half an hour. When I looked up, it was dark outside." },
  { player: "Elias", hours: 22, isRecommended: true, quote: "Easy to get into, and it kept giving me reasons to come back." },
  { player: "Wren", hours: 47, isRecommended: true, quote: "It took a few hours to click. After that I did not want to stop." },
  { player: "Petra", hours: 64, isRecommended: true, quote: "This is the one I think about when I am not playing it." },
  { player: "Sol", hours: 12, isRecommended: true, quote: "I have already told two friends to try it." },
  { player: "Mika", hours: 89, isRecommended: true, quote: "I played it in short sessions all month and never got tired of it." },
];

export const negativeReviews: SampleReview[] = [
  { player: "Dara", hours: 5, isRecommended: false, quote: "I can see why people love it, but it never clicked for me." },
  { player: "Joren", hours: 9, isRecommended: false, quote: "Good ideas, but the pace lost me about halfway." },
  { player: "Lise", hours: 3, isRecommended: false, quote: "Not for me. I kept waiting for it to open up." },
];
