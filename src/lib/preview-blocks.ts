import type { TextBlock } from "./game-details";

const PREVIEW_CHARS = 900;

const lengthOf = (block: TextBlock) => (block.type === "list" ? block.items.join("").length : block.text.length);

/** How many blocks to show before "Read more". Never ends on a heading. */
export function previewCount(blocks: TextBlock[]): number {
  let length = 0;
  let count = 0;
  while (count < blocks.length && length < PREVIEW_CHARS) {
    const block = blocks[count];
    if (!block) break;
    length += lengthOf(block);
    count += 1;
  }
  while (count > 1 && blocks[count - 1]?.type === "heading") count -= 1;
  return count;
}
