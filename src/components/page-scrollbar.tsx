"use client";

import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect } from "react";
import { scrollbarOptions } from "@/lib/scrollbar-options";

/** The same scrollbar for the page itself. Scrolling stays native. */
export function PageScrollbar() {
  const [initialize] = useOverlayScrollbars({ options: scrollbarOptions });

  useEffect(() => {
    initialize(document.body);
  }, [initialize]);

  return null;
}
