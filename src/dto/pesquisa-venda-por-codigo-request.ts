import z from "zod/v4/classic/external.cjs";

export const PesquisaVendaPorCodigoRequestSchema = z.object({
  codigos: z.array(z.number())
});
export type PesquisaVendaPorCodigoRequest = z.infer<typeof PesquisaVendaPorCodigoRequestSchema>;
