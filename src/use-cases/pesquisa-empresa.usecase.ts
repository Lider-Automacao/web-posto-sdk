
import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { PesquisaEmpresasRequest, PesquisaEmpresasRequestSchema } from "../dto/pesquisa-empresas-request";
import { PesquisaEmpresasResponse } from "../dto/pesquisa-empresas-response";


export class PesquisaEmpresas {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaEmpresasRequest): Promise<PesquisaEmpresasResponse> {
    const parsedData = PesquisaEmpresasRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get('/INTEGRACAO/EMPRESAS', {
      params: parsedData.data
    });
  }
}

