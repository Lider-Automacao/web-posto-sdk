
import { WebPostoApi } from "../api/web-posto-api.service";
import { CadastraClienteRequest, CadastraClienteRequestSchema } from "../dto/cadastra-cliente-request";
import { CadastraClienteResponse, CadastraClienteResponseSchema } from "../dto/cadastra-cliente-response";
import { WebPostoError } from "../errors/web-posto.error";

export class CadastraCliente {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: CadastraClienteRequest): Promise<CadastraClienteResponse> {
    const parsedData = CadastraClienteRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const { cliente } = parsedData.data

    const data = await this.api.post('/INTEGRACAO/CLIENTE', cliente);

    return CadastraClienteResponseSchema.parse(data);
  }
}
