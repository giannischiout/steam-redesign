import { defaultFiltersLayout, filtersLayoutSchema, filtersLayoutStorageKey } from "@/lib/filters-layout-setting";
import { usePageSetting } from "./use-page-setting";

export function useFiltersLayout() {
  const [layout, setLayout] = usePageSetting({
    key: filtersLayoutStorageKey,
    fallback: defaultFiltersLayout,
    parse: (raw) => filtersLayoutSchema.catch(defaultFiltersLayout).parse(raw),
  });
  return { layout, setLayout };
}
