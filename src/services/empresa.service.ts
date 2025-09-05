import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaEmpresas, PesquisaEmpresasRequest, PesquisaEmpresasResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";

export class EmpresaService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: PesquisaEmpresasRequest): Promise<PesquisaEmpresasResponse> {
    return new PesquisaEmpresas(this.api).executa(request)
  }

  public async pesquisaTodos(request: PesquisaEmpresasRequest): Promise<PesquisaEmpresasResponse['resultados']> {
    const useCase = new PesquisaEmpresas(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, request)
  }
}