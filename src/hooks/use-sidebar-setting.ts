import { defaultSidebar, sidebarSchema, sidebarStorageKey } from "@/lib/sidebar-setting";
import { usePageSetting } from "./use-page-setting";

export function useSidebarSetting() {
  const [sidebar, setSidebar] = usePageSetting({
    key: sidebarStorageKey,
    fallback: defaultSidebar,
    parse: (raw) => sidebarSchema.catch(defaultSidebar).parse(raw),
  });
  return { sidebar, setSidebar };
}
