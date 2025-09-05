import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaTituloReceberRequest, PesquisaTituloReceberResponse } from "@/dto";
import { PesquisaTituloReceber } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";
import { Nullable, coalesce } from "@raicamposs/toolkit";

export class TituloReceberService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request?: Nullable<PesquisaTituloReceberRequest>): Promise<PesquisaTituloReceberResponse> {
    return new PesquisaTituloReceber(this.api).executa(coalesce(request, {} as PesquisaTituloReceberRequest))
  }

  public async pesquisaTodos(request?: Nullable<PesquisaTituloReceberRequest>): Promise<PesquisaTituloReceberResponse['resultados']> {
    const useCase = new PesquisaTituloReceber(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, coalesce(request, {} as PesquisaTituloReceberRequest))
  }
}