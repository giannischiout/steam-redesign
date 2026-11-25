"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useId, useState } from "react";
import type { TextBlock } from "@/lib/game-details";
import { previewCount } from "@/lib/preview-blocks";
import { DescriptionBlock } from "./description-block";

/** The start of the description, and the rest on request. */
export function Description({ blocks }: { blocks: TextBlock[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const preview = previewCount(blocks);
  const Icon = isOpen ? IconChevronUp : IconChevronDown;

  return (
    <div className="grid gap-3">
      <div id={id} className="grid max-w-[68ch] gap-3">
        {blocks.slice(0, isOpen ? blocks.length : preview).map((block, index) => (
          <DescriptionBlock key={index} block={block} />
        ))}
      </div>
      {preview < blocks.length && (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 cursor-pointer items-center gap-1 justify-self-start rounded-thumb text-sm text-link hover:underline"
        >
          {isOpen ? "Show less" : "Read more"}
          <Icon aria-hidden="true" size={16} />
        </button>
      )}
    </div>
  );
}
