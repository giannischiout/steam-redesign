type FilterChoiceProps = {
  type: "checkbox" | "radio";
  name?: string;
  label: string;
  isChecked: boolean;
  count: number;
  onChange: () => void;
};

export function FilterChoice({ type, name, label, isChecked, count, onChange }: FilterChoiceProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm hover:text-text-strong has-disabled:cursor-default has-disabled:opacity-50">
      <input
        type={type}
        name={name}
        checked={isChecked}
        disabled={count === 0 && !isChecked}
        onChange={onChange}
        className="size-4 shrink-0 cursor-[inherit] accent-accent"
      />
      <span className="flex-1">{label}</span>
      <span className="text-text-long tabular-nums">
        {count}
        <span className="sr-only"> games</span>
      </span>
    </label>
  );
}
