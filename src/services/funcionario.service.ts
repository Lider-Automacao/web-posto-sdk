import { coalesce, Nullable } from "@raicamposs/toolkit";
import { WebPostoApi } from "../api/web-posto-api.service";
import { PesquisaFuncionariosRequest, PesquisaFuncionariosResponse } from "../dto";
import { PesquisaFuncionarios } from "../use-cases";
import { buscarTodosOsDadosComPaginacao, buscarTodosOsDadosComPaginacaoStream } from "../utils";

export class FuncionarioService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request?: Nullable<PesquisaFuncionariosRequest>): Promise<PesquisaFuncionariosResponse> {
    return new PesquisaFuncionarios(this.api).executa(coalesce(request, {} as PesquisaFuncionariosRequest))
  }

  public async pesquisaTodos(request?: Nullable<PesquisaFuncionariosRequest>): Promise<PesquisaFuncionariosResponse['resultados']> {
    const useCase = new PesquisaFuncionarios(this.api)
    const { limite, ...params } = coalesce(request, { limite: 2_000 })
    return buscarTodosOsDadosComPaginacao(useCase.executa.bind(useCase), params, limite)
  }

  public pesquisaTodosAsStream(request: PesquisaFuncionariosRequest): AsyncIterable<PesquisaFuncionariosResponse['resultados'][0]> {
    const useCase = new PesquisaFuncionarios(this.api)
    const { limite, ...params } = coalesce(request, { limite: 500 })
    return buscarTodosOsDadosComPaginacaoStream(useCase.executa.bind(useCase), params, limite)
  }
}