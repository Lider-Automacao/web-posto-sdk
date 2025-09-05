
import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { ClienteSchema } from "@/models";
import z from "zod";


const CadastraClienteRequestSchema = z.object({
  cliente: ClienteSchema,
})

const CadastraClienteResponseSchema = z.object({
  codCliente: z.number(),
})

export type CadastraClienteRequest = z.infer<typeof CadastraClienteRequestSchema>
export type CadastraClienteResponse = z.infer<typeof CadastraClienteResponseSchema>


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

    const data = await this.api.post('/INTEGRACAO/CLIENTE', {
      params: cliente
    });

    return CadastraClienteResponseSchema.parse(data);
  }
}
