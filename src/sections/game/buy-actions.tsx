"use client";

import { useState } from "react";
import { WishlistButton } from "@/components/wishlist-button";
import { useWishlist } from "@/hooks/use-wishlist";

type BuyActionsProps = { id: number; name: string; buyLabel: string | null; isSaved: boolean };

/** There is no cart or checkout: the button only says so. The wishlist resets on reload. */
export function BuyActions({ id, name, buyLabel, isSaved }: BuyActionsProps) {
  const wishlist = useWishlist(isSaved ? [id] : []);
  const [wasAsked, setWasAsked] = useState(false);

  return (
    <div className="grid gap-2">
      {buyLabel && (
        <button
          type="button"
          onClick={() => setWasAsked(true)}
          className="h-11 cursor-pointer rounded-full bg-text-strong px-4 font-semibold text-page"
        >
          {buyLabel}
        </button>
      )}
      <WishlistButton name={name} isSaved={wishlist.has(id)} onToggle={() => wishlist.toggle(id)} />
      <p role="status" className="text-center text-sm text-text-long empty:hidden">
        {wasAsked && "This is a design concept. There is no cart or checkout."}
      </p>
    </div>
  );
}
