import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { PesquisaTituloReceberRequest, PesquisaTituloReceberRequestSchema } from "../dto/pesquisa-titulo-receber-request";
import { PesquisaTituloReceberResponse } from "../dto/pesquisa-titulo-receber-response";


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