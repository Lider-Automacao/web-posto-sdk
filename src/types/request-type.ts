import z from "zod";

export const QuerySchema = z.object({
  ultimoCodigo: z.number().min(1).nullish(),
  limite: z.number().min(1).max(2_000).default(1_000),
})

export type Query = z.infer<typeof QuerySchema>