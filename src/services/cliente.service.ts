import { WebPostoApi } from "../api/web-posto-api.service";
import { CadastraClienteRequest, CadastraClienteResponse } from "../dto";
import { ClienteUnidadeNegocio } from "../models";
import { AtualizaCliente, AtualizaClienteRequest, AtualizaClienteUnidadeNegocio, CadastraCliente } from "../use-cases";

export class ClienteService {

  constructor(private readonly api: WebPostoApi) { }

  public async cadastra(request: CadastraClienteRequest): Promise<CadastraClienteResponse> {
    return new CadastraCliente(this.api).executa(request)
  }

  public async atualiza(request: AtualizaClienteRequest): Promise<void> {
    return new AtualizaCliente(this.api).executa(request)
  }

  public async atualizaUnidadeNegocio(request: ClienteUnidadeNegocio): Promise<void> {
    return new AtualizaClienteUnidadeNegocio(this.api).executa(request)
  }
}