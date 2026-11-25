import type { Price, Reviews } from "./browse";

export function priceLabel(price: Price): string {
  if (price === "any") return "Any price";
  return price === "0" ? "Free" : `Under ${price}€`;
}

export function reviewsLabel(reviews: Reviews): string {
  return reviews === "any" ? "Any reviews" : `${reviews}% positive or more`;
}
