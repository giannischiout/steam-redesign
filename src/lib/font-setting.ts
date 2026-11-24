import { z } from "zod";

export const fontSchema = z.enum(["red-hat", "onest", "sofia"]);
export type FontKey = z.infer<typeof fontSchema>;

export const defaultFont: FontKey = "red-hat";
export const fontStorageKey = "font";

export const fontOptions: { key: FontKey; label: string; className: string }[] = [
  { key: "red-hat", label: "Red Hat Text", className: "font-red-hat" },
  { key: "onest", label: "Onest", className: "font-onest" },
  { key: "sofia", label: "Sofia Sans", className: "font-sofia" },
];

/** Runs before first paint, so the saved font does not flash in late. */
export const fontScript = `try{var f=localStorage.getItem("${fontStorageKey}");if(${JSON.stringify(fontSchema.options)}.includes(f))document.documentElement.dataset.font=f}catch{}`;
