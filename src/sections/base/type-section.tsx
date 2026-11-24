export function TypeSection() {
  return (
    <section aria-labelledby="type-title" className="grid gap-4">
      <h2 id="type-title" className="text-2xl font-bold text-text-strong">
        Type
      </h2>
      <p className="text-sm text-text-long">
        Arial for now. The typeface is not chosen yet.
      </p>
      <p className="text-4xl font-bold text-text-strong">
        Featured and recommended
      </p>
      <p className="text-xl text-text-strong">New and trending</p>
      <p className="max-w-prose">
        Browse games by genre, price and reviews, then open one to see its
        trailer and screenshots.
      </p>
      <p className="text-sm text-text-quiet">Released 19 Apr 2011</p>
    </section>
  );
}
