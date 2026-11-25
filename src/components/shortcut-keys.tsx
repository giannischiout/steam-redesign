import { cn } from "@/lib/cn";

type ShortcutKeysProps = { letter: string; className?: string };

/**
 * A shortcut as one piece of quiet text, "⌘K", like shadcn's menu shortcuts. The ⌘ is shown
 * on every system by choice; Ctrl works too. The colour follows the text around it.
 * Hidden from screen readers: the button says it with `aria-keyshortcuts`.
 */
export function ShortcutKeys({ letter, className }: ShortcutKeysProps) {
  return (
    <kbd aria-hidden="true" className={cn("shrink-0 font-sans text-sm tracking-wider whitespace-nowrap opacity-70", className)}>
      ⌘{letter.toUpperCase()}
    </kbd>
  );
}
