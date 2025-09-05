import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { PesquisaVendaPorCodigoRequest, PesquisaVendaPorCodigoRequestSchema } from "../dto/pesquisa-venda-por-codigo-request";
import { PesquisaVendaPorCodigoResponse } from "../dto/pesquisa-venda-por-codigo-response";


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
