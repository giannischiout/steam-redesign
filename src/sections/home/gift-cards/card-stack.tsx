import { IconGiftFilled } from "@tabler/icons-react";
import { giftCardAmount } from "@/data/gift-cards";
import { cn } from "@/lib/cn";

// Every step is the same: 8px across and 5 degrees round (2px and 2 degrees more on hover). Back to front.
const poses = [
  "left-4 rotate-10 group-hover:translate-x-1 group-hover:rotate-14 group-focus-visible:translate-x-1 group-focus-visible:rotate-14",
  "left-2 rotate-5 group-hover:translate-x-0.5 group-hover:rotate-7 group-focus-visible:translate-x-0.5 group-focus-visible:rotate-7",
  "left-0",
];

/** They open once on load, and further on hover or focus. */
export function CardStack() {
  return (
    <span aria-hidden="true" className="gift-fan relative z-10 block h-13 w-17 shrink-0">
      {poses.map((pose, index) => (
        <span
          key={pose}
          className={cn(
            "absolute top-0 origin-bottom motion-safe:transition-[rotate,translate] motion-safe:duration-300 motion-safe:ease-out",
            pose,
          )}
        >
          <span className="gift-fan-card grid h-13 w-10 grid-rows-[auto_1fr] rounded-thumb border border-link bg-linear-to-t from-accent to-button-blue-to p-1 text-text-strong shadow-sm shadow-media/50">
            {index === poses.length - 1 && (
              <>
                <span className="text-right text-xs leading-none font-bold">{giftCardAmount}</span>
                <IconGiftFilled size={20} className="place-self-center" />
              </>
            )}
          </span>
        </span>
      ))}
    </span>
  );
}
