import { z } from "zod";
import data from "@/data/details.json";

// The long texts for game pages, from `node scripts/fetch-details.mjs`.
// Import this from server components only: it is large.
const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string() }),
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("list"), items: z.array(z.string()) }),
]);
const rowSchema = z.object({ label: z.string(), value: z.string() });
const requirementsSchema = z.object({ minimum: z.array(rowSchema), recommended: z.array(rowSchema) });
const detailsSchema = z.object({
  about: z.array(blockSchema),
  requirements: z.object({ windows: requirementsSchema, macos: requirementsSchema, linux: requirementsSchema }),
});

export type TextBlock = z.infer<typeof blockSchema>;
export type Requirement = z.infer<typeof rowSchema>;
export type Details = z.infer<typeof detailsSchema>;

const { games } = z.object({ games: z.record(z.string(), detailsSchema) }).parse(data);

export function getDetails(id: number) {
  return games[String(id)];
}
