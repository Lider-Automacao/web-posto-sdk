import z from "zod";
import { QuerySchema } from "../types";

export const PesquisaVendasRequestSchema = QuerySchema.extend({
  turno: z.number().nullish(),
  empresaCodigo: z.number().nullish(),
  dataInicial: z.iso.date().nullish(),
  dataFinal: z.iso.date().nullish(),
  modeloDocumento: z.string().nullish(),
  tipoData: z.enum(['EMISSAO', 'ENTRADA']).nullish(),
  vendaCodigo: z.array(z.number()).nullish(),
  situacao: z.string().nullish(),
});
export type PesquisaVendasRequest = z.infer<typeof PesquisaVendasRequestSchema>;
