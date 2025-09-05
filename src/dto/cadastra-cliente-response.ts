import z from "zod/v4/classic/external.cjs";

export const CadastraClienteResponseSchema = z.object({
  codCliente: z.number(),
})

export type CadastraClienteResponse = z.infer<typeof CadastraClienteResponseSchema>;
