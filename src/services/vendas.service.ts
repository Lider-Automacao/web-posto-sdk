import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaVendaPorCodigo, PesquisaVendaPorCodigoRequest, PesquisaVendaPorCodigoResponse, PesquisaVendas, PesquisaVendasRequest, PesquisaVendasResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";
import { Nullable, coalesce } from "@raicamposs/toolkit";

export class VendasService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: Nullable<PesquisaVendasRequest>): Promise<PesquisaVendasResponse> {
    return new PesquisaVendas(this.api).executa(coalesce(request, {} as PesquisaVendasRequest))
  }

  public async pesquisaTodos(request: Nullable<PesquisaVendasRequest>): Promise<PesquisaVendasResponse['resultados']> {
    const useCase = new PesquisaVendas(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, coalesce(request, {} as PesquisaVendasRequest))
  }

  public async pesquisaPorCodigo(request: PesquisaVendaPorCodigoRequest): Promise<PesquisaVendaPorCodigoResponse> {
    return new PesquisaVendaPorCodigo(this.api).executa(request)
  }
}