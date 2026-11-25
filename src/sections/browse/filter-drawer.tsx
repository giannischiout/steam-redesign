import { IconAdjustmentsFilled, IconX } from "@tabler/icons-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { ScrollArea } from "@/components/scroll-area";

type FilterDrawerProps = { count: number; onClear: () => void; children: ReactNode };

/** Phones and tablets: the filters rise from the bottom of the screen. */
export function FilterDrawer({ count, onClear, children }: FilterDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="flex h-11 cursor-pointer items-center gap-2 rounded-full bg-page-product px-4 text-sm text-text-menu hover:text-text-strong lg:hidden"
      >
        <IconAdjustmentsFilled aria-hidden="true" size={18} />
        Filters
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Filters"
        onClick={closeOnBackdrop}
        className="filter-drawer mx-auto mt-auto mb-0 max-h-[85dvh] w-full max-w-2xl overflow-hidden rounded-t-tile bg-page-product text-text backdrop:bg-page/60"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <div className="flex shrink-0 items-center justify-between py-1 pr-1 pl-4">
            <p className="font-bold text-text-strong">Filters</p>
            <button
              type="button"
              aria-label="Close filters"
              onClick={close}
              className="grid size-11 cursor-pointer place-content-center rounded-full text-text-menu -outline-offset-2 hover:text-text-strong"
            >
              <IconX aria-hidden="true" size={20} />
            </button>
          </div>
          <ScrollArea className="min-h-0">
            <div className="px-4 pb-4">{children}</div>
          </ScrollArea>
          <div className="flex shrink-0 items-center gap-3 border-t border-text-quiet/25 p-3">
            <button type="button" onClick={onClear} className="h-11 cursor-pointer px-3 text-sm text-link">
              Clear all
            </button>
            <button
              type="button"
              onClick={close}
              className="h-11 flex-1 cursor-pointer rounded-full bg-text-strong px-4 font-semibold text-page"
            >
              {count === 1 ? "Show 1 game" : `Show ${count} games`}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
