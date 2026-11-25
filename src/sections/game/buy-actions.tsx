"use client";

import { IconGiftFilled } from "@tabler/icons-react";
import { useState } from "react";
import { WishlistButton } from "@/components/wishlist-button";
import { useWishlist } from "@/hooks/use-wishlist";

type BuyActionsProps = {
  id: number;
  name: string;
  /** Null when there is nothing to buy yet. */
  buyLabel: string | null;
  canGift: boolean;
  isSaved: boolean;
};

const notes = {
  buy: "This is a design concept. There is no cart or checkout.",
  gift: "This is a design concept. Gifts cannot be sent.",
};

/** There is no cart, checkout or gift form: the buttons only say so. The wishlist resets on reload. */
export function BuyActions({ id, name, buyLabel, canGift, isSaved }: BuyActionsProps) {
  const wishlist = useWishlist(isSaved ? [id] : []);
  const [asked, setAsked] = useState<keyof typeof notes | null>(null);
  const heart = { name, isSaved: wishlist.has(id), onToggle: () => wishlist.toggle(id) };

  return (
    <div className="grid gap-2">
      {buyLabel ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAsked("buy")}
            className="h-11 min-w-0 flex-1 cursor-pointer rounded-full bg-text-strong px-4 font-semibold text-page"
          >
            {buyLabel}
          </button>
          <WishlistButton {...heart} variant="icon" />
        </div>
      ) : (
        <WishlistButton {...heart} />
      )}
      {canGift && (
        <button
          type="button"
          onClick={() => setAsked("gift")}
          className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-page px-4 text-sm font-semibold text-text-menu hover:text-text-strong"
        >
          <IconGiftFilled aria-hidden="true" size={18} />
          Send as gift
        </button>
      )}
      <p role="status" className="text-center text-sm text-text-long empty:hidden">
        {asked && notes[asked]}
      </p>
    </div>
  );
}
