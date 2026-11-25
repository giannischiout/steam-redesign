import type { PartialOptions } from "overlayscrollbars";

/** One scrollbar everywhere: it shows when the cursor moves or the area scrolls, then fades. */
export const scrollbarOptions: PartialOptions = {
  scrollbars: { theme: "os-theme-store", autoHide: "move", autoHideDelay: 900 },
};
