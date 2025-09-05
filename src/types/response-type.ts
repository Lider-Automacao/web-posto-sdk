import z from "zod";

export const ResponseSchema = z.object({
  ultimoCodigo: z.number().min(1).nullish(),
})

export type Response = z.infer<typeof ResponseSchema>