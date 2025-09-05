import z from "zod";

export const PesquisaVendaPorCodigoRequestSchema = z.object({
  codigos: z.array(z.number())
});
export type PesquisaVendaPorCodigoRequest = z.infer<typeof PesquisaVendaPorCodigoRequestSchema>;
