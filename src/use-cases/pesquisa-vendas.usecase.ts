import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { PesquisaVendasRequest, PesquisaVendasRequestSchema } from "../dto/pesquisa-vendas-request";
import { PesquisaVendasResponse } from "../dto/pesquisa-vendas-response";


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
