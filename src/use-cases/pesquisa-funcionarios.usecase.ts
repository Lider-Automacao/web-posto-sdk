import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { FuncionarioSchema } from "@/models";
import { QuerySchema } from "@/types/request-type";
import { ResponseSchema } from "@/types/response-type";
import z from "zod";


const PesquisaFuncionariosRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
  funcionarioCodigo: z.number().nullish(),
})

const PesquisaFuncionariosResponseSchema = ResponseSchema.extend({
  resultados: z.array(FuncionarioSchema).default([]),
})

export type PesquisaFuncionariosRequest = z.infer<typeof PesquisaFuncionariosRequestSchema>
export type PesquisaFuncionariosResponse = z.infer<typeof PesquisaFuncionariosResponseSchema>


export class PesquisaFuncionarios {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaFuncionariosRequest): Promise<PesquisaFuncionariosResponse> {
    const parsedData = PesquisaFuncionariosRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get('/INTEGRACAO/FUNCIONARIO', {
      params: parsedData.data
    });
  }
}

