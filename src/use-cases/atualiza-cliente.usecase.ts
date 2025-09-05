
import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { ClienteSchema } from "@/models";
import z from "zod";


const AtualizaClienteRequestSchema = z.object({
  id: z.number(),
  cliente: ClienteSchema,
})

export type AtualizaClienteRequest = z.infer<typeof AtualizaClienteRequestSchema>

export class AtualizaCliente {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: AtualizaClienteRequest): Promise<void> {
    const parsedData = AtualizaClienteRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const { cliente, id } = parsedData.data

    await this.api.put(`/INTEGRACAO/CLIENTE/${id}`, {
      params: cliente
    });
  }
}
