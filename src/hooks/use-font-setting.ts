import { defaultFont, fontSchema, fontStorageKey } from "@/lib/font-setting";
import { usePageSetting } from "./use-page-setting";

export function useFontSetting() {
  const [font, setFont] = usePageSetting({
    key: fontStorageKey,
    fallback: defaultFont,
    parse: (raw) => fontSchema.catch(defaultFont).parse(raw),
  });
  return { font, setFont };
}
