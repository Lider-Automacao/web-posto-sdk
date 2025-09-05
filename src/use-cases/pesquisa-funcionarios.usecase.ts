import { WebPostoApi } from "../api/web-posto-api.service";
import { PesquisaFuncionariosRequest, PesquisaFuncionariosRequestSchema } from "../dto/pesquisa-funcionarios-request";
import { PesquisaFuncionariosResponse } from "../dto/pesquisa-funcionarios-response";
import { WebPostoError } from "../errors/web-posto.error";


export class PesquisaFuncionarios {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaFuncionariosRequest): Promise<PesquisaFuncionariosResponse> {
    const parsedData = PesquisaFuncionariosRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get('/INTEGRACAO/FUNCIONARIO', {
      params: parsedData.data
    });
  }
}

