import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { TituloReceberSchema } from "@/models";
import { QuerySchema } from "@/types/request-type";
import { ResponseSchema } from "@/types/response-type";
import z from "zod";


const PesquisaTituloReceberRequestSchema = QuerySchema.extend({
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
})

const PesquisaTituloReceberResponseSchema = ResponseSchema.extend({
  resultados: z.array(TituloReceberSchema).default([]),
})

export type PesquisaTituloReceberRequest = z.infer<typeof PesquisaTituloReceberRequestSchema>
export type PesquisaTituloReceberResponse = z.infer<typeof PesquisaTituloReceberResponseSchema>


export class PesquisaTituloReceber {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaTituloReceberRequest): Promise<PesquisaTituloReceberResponse> {
    const parsedData = PesquisaTituloReceberRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get('/INTEGRACAO/TITULO_RECEBER', {
      params: parsedData.data
    });
  }
}