import Link from "next/link";
import { CardStack } from "./card-stack";

/** The bar starts under the middle of the cards, so they stick out on its left, top and bottom. */
export function GiftCardLink() {
  return (
    <Link
      href="/gift-cards"
      className="group flex items-center rounded-thumb font-semibold whitespace-nowrap text-text-strong"
    >
      <CardStack />
      <span className="-ml-10 flex h-11 items-center rounded-thumb bg-linear-to-r from-page-product to-button-blue-to pr-4 pl-15 group-hover:underline">
        Send a gift card
      </span>
    </Link>
  );
}
