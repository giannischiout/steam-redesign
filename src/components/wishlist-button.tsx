import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type WishlistButtonProps = {
  name: string;
  isSaved: boolean;
  onToggle: () => void;
  /** "icon" is a round heart, for beside another button. */
  variant?: "label" | "icon";
};

export function WishlistButton({ name, isSaved, onToggle, variant = "label" }: WishlistButtonProps) {
  const Icon = isSaved ? IconHeartFilled : IconHeart;

  return (
    <button
      type="button"
      aria-label={`Wishlist ${name}`}
      aria-pressed={isSaved}
      title={variant === "icon" ? (isSaved ? "On wishlist" : "Add to wishlist") : undefined}
      onClick={onToggle}
      className={cn(
        "flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-page text-sm font-semibold text-text-menu hover:text-text-strong aria-pressed:text-text-strong",
        variant === "icon" ? "w-11" : "px-4",
      )}
    >
      <Icon aria-hidden="true" size={variant === "icon" ? 20 : 18} />
      {variant === "label" && (isSaved ? "On wishlist" : "Wishlist")}
    </button>
  );
}
