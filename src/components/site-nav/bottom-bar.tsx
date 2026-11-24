"use client";

import { Suspense } from "react";
import { bottomBarItems } from "@/lib/navigation";
import { BottomBarLink } from "./bottom-bar-link";

/** Phone only. */
export function BottomBar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 bg-header px-2 py-1 md:hidden"
    >
      <ul className="flex justify-around">
        {bottomBarItems.map((item) => (
          <li key={item.href}>
            <Suspense fallback={<span className="block size-14" />}>
              <BottomBarLink item={item} />
            </Suspense>
          </li>
        ))}
      </ul>
    </nav>
  );
}
