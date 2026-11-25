"use client";

import { IconSettingsFilled, IconX } from "@tabler/icons-react";
import { ScrollArea } from "@/components/scroll-area";
import { ShortcutKeys } from "@/components/shortcut-keys";
import { useFontSetting } from "@/hooks/use-font-setting";
import { fontOptions } from "@/lib/font-setting";
import { ChoiceList } from "./choice-list";
import { SidebarPicker } from "./sidebar-picker";

const id = "site-settings";

/**
 * Floats bottom right on every page. A native popover, so Escape and a click outside
 * close it, and the page behind stays visible while it changes.
 */
export function SiteSettings() {
  const { font, setFont } = useFontSetting();

  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className="fixed right-4 bottom-20 z-20 flex h-12 min-w-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-text-strong text-sm font-semibold text-page shadow-lg shadow-media md:right-6 md:bottom-6 md:pr-5 md:pl-4"
      >
        <IconSettingsFilled aria-hidden="true" size={22} />
        <span className="max-md:sr-only">Settings</span>
      </button>
      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-label="Settings"
        className="inset-auto right-4 bottom-34 m-0 max-h-[calc(100dvh-10rem)] w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-tile border border-text-quiet/40 bg-page-product text-text shadow-2xl shadow-media open:flex open:flex-col md:right-6 md:bottom-21 md:max-h-[calc(100dvh-7rem)]"
      >
        <div className="flex shrink-0 items-center justify-between py-1 pr-1 pl-4">
          <p className="text-lg font-bold text-text-strong">Settings</p>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            aria-label="Close settings"
            className="grid size-11 cursor-pointer place-content-center rounded-full text-text-menu -outline-offset-2 hover:text-text-strong"
          >
            <IconX aria-hidden="true" size={20} />
          </button>
        </div>
        <ScrollArea className="min-h-0">
          <div className="grid gap-5 px-4 pb-4">
            <div className="hidden md:block">
              <SidebarPicker />
            </div>
            <ChoiceList legend="Font" options={fontOptions} value={font} onChange={setFont} />
            <div className="hidden gap-2 md:grid">
              <p className="font-bold text-text-strong">Shortcuts</p>
              <dl className="grid grid-cols-[1fr_auto] items-center gap-y-2 text-sm">
                <dt>Search the store</dt>
                <dd>
                  <ShortcutKeys letter="k" />
                </dd>
                <dt>Open or close the sidebar</dt>
                <dd>
                  <ShortcutKeys letter="b" />
                </dd>
              </dl>
            </div>
            <p className="text-sm text-text-long">Saved in this browser only.</p>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
