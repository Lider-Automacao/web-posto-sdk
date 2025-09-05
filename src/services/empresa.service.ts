import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaEmpresas, PesquisaEmpresasRequest, PesquisaEmpresasResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";
import { coalesce, Nullable } from "@raicamposs/toolkit";

export class EmpresaService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: Nullable<PesquisaEmpresasRequest>): Promise<PesquisaEmpresasResponse> {
    return new PesquisaEmpresas(this.api).executa(coalesce(request, {} as PesquisaEmpresasRequest))
  }

  public async pesquisaTodos(request: Nullable<PesquisaEmpresasRequest>): Promise<PesquisaEmpresasResponse['resultados']> {
    const useCase = new PesquisaEmpresas(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, coalesce(request, {} as PesquisaEmpresasRequest))
  }
}