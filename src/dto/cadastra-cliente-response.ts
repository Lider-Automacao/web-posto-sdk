import z from "zod";

export const CadastraClienteResponseSchema = z.object({
  codCliente: z.number(),
})

export type CadastraClienteResponse = z.infer<typeof CadastraClienteResponseSchema>;
