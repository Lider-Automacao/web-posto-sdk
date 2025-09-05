import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaTituloReceber, PesquisaTituloReceberRequest, PesquisaTituloReceberResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";

export class TituloReceberService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: PesquisaTituloReceberRequest): Promise<PesquisaTituloReceberResponse> {
    return new PesquisaTituloReceber(this.api).executa(request)
  }

  public async pesquisaTodos(request: PesquisaTituloReceberRequest): Promise<PesquisaTituloReceberResponse['resultados']> {
    const useCase = new PesquisaTituloReceber(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, request)
  }
}