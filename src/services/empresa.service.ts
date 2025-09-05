import { coalesce, Nullable } from "@raicamposs/toolkit";
import { WebPostoApi } from "../api/web-posto-api.service";
import { PesquisaEmpresasRequest, PesquisaEmpresasResponse } from "../dto";
import { PesquisaEmpresas } from "../use-cases";
import { buscarTodosOsDadosComPaginacao } from "../utils";

export class EmpresaService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request?: Nullable<PesquisaEmpresasRequest>): Promise<PesquisaEmpresasResponse> {
    return new PesquisaEmpresas(this.api).executa(coalesce(request, {} as PesquisaEmpresasRequest))
  }

  public async pesquisaTodos(request?: Nullable<PesquisaEmpresasRequest>): Promise<PesquisaEmpresasResponse['resultados']> {
    const useCase = new PesquisaEmpresas(this.api)
    const { limite, ...params } = coalesce(request, { limite: 2_000 })
    return buscarTodosOsDadosComPaginacao(useCase.executa.bind(useCase), params, limite)
  }
}