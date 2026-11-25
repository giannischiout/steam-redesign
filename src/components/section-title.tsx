type SectionTitleProps = { id: string; children: string };

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className="text-xl font-bold text-text-strong md:text-2xl">
      {children}
    </h2>
  );
}
