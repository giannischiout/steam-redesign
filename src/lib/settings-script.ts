import { filtersLayoutSchema, filtersLayoutStorageKey } from "./filters-layout-setting";
import { fontSchema, fontStorageKey } from "./font-setting";
import { sidebarSchema, sidebarStorageKey } from "./sidebar-setting";

const saved: [key: string, allowed: string[]][] = [
  [fontStorageKey, fontSchema.options],
  [sidebarStorageKey, sidebarSchema.options],
  [filtersLayoutStorageKey, filtersLayoutSchema.options],
];

/** Runs before first paint, so saved choices do not flash in late. */
export const settingsScript = `try{for(const [k,a] of ${JSON.stringify(saved)}){const v=localStorage.getItem(k);if(a.includes(v))document.documentElement.dataset[k]=v}}catch{}`;
