import { Nullable, coalesce } from "@raicamposs/toolkit";
import { WebPostoApi } from "../api/web-posto-api.service";
import { PesquisaTituloReceberRequest, PesquisaTituloReceberResponse } from "../dto";
import { PesquisaTituloReceber } from "../use-cases";
import { buscarTodosOsDadosComPaginacao, buscarTodosOsDadosComPaginacaoStream } from "../utils";

export class TituloReceberService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request?: Nullable<PesquisaTituloReceberRequest>): Promise<PesquisaTituloReceberResponse> {
    return new PesquisaTituloReceber(this.api).executa(coalesce(request, {} as PesquisaTituloReceberRequest))
  }

  public async pesquisaTodos(request: PesquisaTituloReceberRequest): Promise<PesquisaTituloReceberResponse['resultados']> {
    const useCase = new PesquisaTituloReceber(this.api)
    const { limite, ...params } = request
    return buscarTodosOsDadosComPaginacao(useCase.executa.bind(useCase), params, limite)
  }

  public pesquisaTodosAsStream(request: PesquisaTituloReceberRequest): AsyncIterable<PesquisaTituloReceberResponse['resultados'][0]> {
    const useCase = new PesquisaTituloReceber(this.api)
    const { limite, ...params } = request
    return buscarTodosOsDadosComPaginacaoStream(useCase.executa.bind(useCase), params, limite)
  }
}