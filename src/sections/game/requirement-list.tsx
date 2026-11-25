import type { Requirement } from "@/lib/game-details";

export function RequirementList({ title, rows }: { title: string; rows: Requirement[] }) {
  return (
    <div className="grid content-start gap-3">
      <h3 className="font-bold text-text-strong">{title}</h3>
      <dl className="grid gap-3 text-sm">
        {rows.map((row, index) => (
          <div key={index}>
            <dt className="text-text-long empty:hidden">{row.label}</dt>
            <dd className="break-words text-text-strong">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
