import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { VendaSchema } from "@/models";
import { ResponseSchema } from "@/types/response-type";
import z from "zod";


const PesquisaVendaPorCodigoRequestSchema = z.object({
  codigos: z.array(z.number())
})

const PesquisaVendaPorCodigoResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
})

export type PesquisaVendaPorCodigoRequest = z.infer<typeof PesquisaVendaPorCodigoRequestSchema>
export type PesquisaVendaPorCodigoResponse = z.infer<typeof PesquisaVendaPorCodigoResponseSchema>


export class PesquisaVendaPorCodigo {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaVendaPorCodigoRequest): Promise<PesquisaVendaPorCodigoResponse> {
    const parsedData = PesquisaVendaPorCodigoRequestSchema.safeParse(request);


    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const { codigos, ...params } = parsedData.data;


    return this.api.get(`/INTEGRACAO/VENDA/${codigos.join(',')}`, {
      params
    });
  }
}
