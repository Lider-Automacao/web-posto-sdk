
import { WebPostoApi } from "../api/web-posto-api.service";
import { WebPostoError } from "../errors/web-posto.error";
import { ClienteUnidadeNegocio, ClienteUnidadeNegocioSchema } from "../models";

export class AtualizaClienteUnidadeNegocio {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: ClienteUnidadeNegocio): Promise<void> {
    const parsedData = ClienteUnidadeNegocioSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    await this.api.put(`/INTEGRACAO/CLIENTE_UNIDADE_NEGOCIO`, {
      params: parsedData.data
    });
  }
}
