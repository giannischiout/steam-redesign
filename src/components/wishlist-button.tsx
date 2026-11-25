import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

type WishlistButtonProps = { name: string; isSaved: boolean; onToggle: () => void };

export function WishlistButton({ name, isSaved, onToggle }: WishlistButtonProps) {
  const Icon = isSaved ? IconHeartFilled : IconHeart;

  return (
    <button
      type="button"
      aria-label={`Wishlist ${name}`}
      aria-pressed={isSaved}
      onClick={onToggle}
      className="flex h-11 cursor-pointer items-center gap-2 rounded-full bg-page px-4 text-sm font-semibold text-text-menu hover:text-text-strong aria-pressed:text-text-strong"
    >
      <Icon aria-hidden="true" size={18} />
      {isSaved ? "On wishlist" : "Wishlist"}
    </button>
  );
}
