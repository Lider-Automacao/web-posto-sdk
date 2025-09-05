import z from "zod";
import { QuerySchema } from "../types";

export const PesquisaTituloReceberRequestSchema = QuerySchema.extend({
  turno: z.number().nullish(),
  empresaCodigo: z.number().nullish(),
  dataInicial: z.iso.date(),
  dataFinal: z.iso.date(),
  dataHoraAtualizacao: z.iso.datetime().nullish(),
  apenasPendente: z.boolean().nullish(),
  codigoDuplicata: z.number().nullish(),
  dataFiltro: z.enum(['MOVIMENTO', 'VENCIMENTO', 'PAGAMENTO']),
  convertido: z.number().nullish(),
  vendaCodigo: z.array(z.number()).nullish()
});
export type PesquisaTituloReceberRequest = z.infer<typeof PesquisaTituloReceberRequestSchema>;
