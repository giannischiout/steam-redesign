"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type TabsProps = { tabs: { key: string; label: string; panel: ReactNode }[]; aside: ReactNode };

export function Tabs({ tabs, aside }: TabsProps) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <div
        role="tablist"
        aria-label="Games"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.key}`}
            aria-controls={`panel-${tab.key}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className="h-11 cursor-pointer rounded-full px-4 text-sm text-text-menu hover:text-text-strong aria-selected:bg-page-product aria-selected:text-text-strong"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {aside}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.key}
          role="tabpanel"
          id={`panel-${tab.key}`}
          aria-labelledby={`tab-${tab.key}`}
          hidden={index !== active}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
