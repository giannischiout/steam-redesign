"use client";

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import { scrollbarOptions } from "@/lib/scrollbar-options";

type ScrollAreaProps = Omit<OverlayScrollbarsComponentProps, "options" | "defer">;

/** A box that scrolls up and down. Lay out its content with an element inside it. */
export function ScrollArea({ children, ...props }: ScrollAreaProps) {
  return (
    <OverlayScrollbarsComponent {...props} options={scrollbarOptions} defer>
      {children}
    </OverlayScrollbarsComponent>
  );
}
