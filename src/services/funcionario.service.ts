import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaFuncionariosRequest, PesquisaFuncionariosResponse } from "@/dto";
import { PesquisaFuncionarios } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";
import { coalesce, Nullable } from "@raicamposs/toolkit";

export class FuncionarioService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request?: Nullable<PesquisaFuncionariosRequest>): Promise<PesquisaFuncionariosResponse> {
    return new PesquisaFuncionarios(this.api).executa(coalesce(request, {} as PesquisaFuncionariosRequest))
  }

  public async pesquisaTodos(request?: Nullable<PesquisaFuncionariosRequest>): Promise<PesquisaFuncionariosResponse['resultados']> {
    const useCase = new PesquisaFuncionarios(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, coalesce(request, {} as PesquisaFuncionariosRequest))
  }
}