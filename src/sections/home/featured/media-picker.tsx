import Image from "next/image";

type MediaPickerProps = {
  name: string;
  shots: string[];
  active: number;
  onSelect: (index: number) => void;
};

export function MediaPicker({ name, shots, active, onSelect }: MediaPickerProps) {
  return (
    <ul className="row-start-5 grid grid-cols-2 gap-2 xl:flex-1 xl:auto-rows-fr">
      {shots.map((shot, index) => (
        <li key={shot}>
          <button
            type="button"
            aria-label={`Show ${name} screenshot ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => onSelect(index)}
            className="relative block aspect-video w-full cursor-pointer overflow-hidden rounded-thumb hover:brightness-110 aria-pressed:ring-2 aria-pressed:ring-text-strong xl:aspect-auto xl:size-full xl:min-h-24"
          >
            <Image src={shot} alt="" fill sizes="(min-width: 1280px) 20vw, 50vw" className="object-cover" />
          </button>
        </li>
      ))}
    </ul>
  );
}
