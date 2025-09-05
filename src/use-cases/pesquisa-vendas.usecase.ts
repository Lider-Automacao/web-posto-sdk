import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { VendaSchema } from "@/models";
import { QuerySchema } from "@/types/request-type";
import { ResponseSchema } from "@/types/response-type";
import z from "zod";


const PesquisaVendasRequestSchema = QuerySchema.extend({
  turno: z.number().nullish(),
  empresaCodigo: z.number().nullish(),
  dataInicial: z.iso.date().nullish(),
  dataFinal: z.iso.date().nullish(),
  modeloDocumento: z.string().nullish(),
  tipoData: z.enum(['EMISSAO', 'ENTRADA']).nullish(),
  vendaCodigo: z.array(z.number()).nullish(),
  situacao: z.string().nullish(),
})

const PesquisaVendasResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
})

export type PesquisaVendasRequest = z.infer<typeof PesquisaVendasRequestSchema>
export type PesquisaVendasResponse = z.infer<typeof PesquisaVendasResponseSchema>


export class PesquisaVendas {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaVendasRequest): Promise<PesquisaVendasResponse> {
    const parsedData = PesquisaVendasRequestSchema.safeParse(request);


    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get(`/INTEGRACAO/VENDA`, {
      params: parsedData.data
    });
  }
}
