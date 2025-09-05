import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaFuncionarios, PesquisaFuncionariosRequest, PesquisaFuncionariosResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";

export class FuncionarioService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: PesquisaFuncionariosRequest): Promise<PesquisaFuncionariosResponse> {
    return new PesquisaFuncionarios(this.api).executa(request)
  }

  public async pesquisaTodos(request: PesquisaFuncionariosRequest): Promise<PesquisaFuncionariosResponse['resultados']> {
    const useCase = new PesquisaFuncionarios(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, request)
  }
}