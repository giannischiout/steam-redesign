import type { TextBlock } from "@/lib/game-details";

export function DescriptionBlock({ block }: { block: TextBlock }) {
  if (block.type === "heading") return <h3 className="mt-2 text-lg font-bold text-text-strong">{block.text}</h3>;
  if (block.type === "text") return <p>{block.text}</p>;
  return (
    <ul className="grid list-disc gap-1.5 pl-5">
      {block.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
