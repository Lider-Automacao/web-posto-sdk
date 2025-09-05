import { WebPostoApi } from "@/api/web-posto-api.service";
import { PesquisaVendaPorCodigo, PesquisaVendaPorCodigoRequest, PesquisaVendaPorCodigoResponse, PesquisaVendas, PesquisaVendasRequest, PesquisaVendasResponse } from "@/use-cases";
import { buscarTodosOsDadosComPaginacao } from "@/utils";

export class VendasService {

  constructor(private readonly api: WebPostoApi) { }

  public async pesquisa(request: PesquisaVendasRequest): Promise<PesquisaVendasResponse> {
    return new PesquisaVendas(this.api).executa(request)
  }

  public async pesquisaTodos(request: PesquisaVendasRequest): Promise<PesquisaVendasResponse['resultados']> {
    const useCase = new PesquisaVendas(this.api)
    return buscarTodosOsDadosComPaginacao(useCase.executa, request)
  }

  public async pesquisaPorCodigo(request: PesquisaVendaPorCodigoRequest): Promise<PesquisaVendaPorCodigoResponse> {
    return new PesquisaVendaPorCodigo(this.api).executa(request)
  }
}