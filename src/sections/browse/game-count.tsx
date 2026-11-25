import { cn } from "@/lib/cn";

export function GameCount({ count, className }: { count: number; className?: string }) {
  return (
    <p role="status" className={cn("text-text-strong", className)}>
      {count === 1 ? "1 game" : `${count} games`}
    </p>
  );
}
