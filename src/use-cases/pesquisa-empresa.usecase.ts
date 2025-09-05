
import { WebPostoApi } from "@/api/web-posto-api.service";
import { WebPostoError } from "@/errors/web-posto.error";
import { EmpresaSchema } from "@/models/empresa";
import { QuerySchema } from "@/types/request-type";
import { ResponseSchema } from "@/types/response-type";
import z from "zod";


const PesquisaEmpresasRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
});


const PesquisaEmpresasResponseSchema = ResponseSchema.extend({
  resultados: z.array(EmpresaSchema).default([]),
})

export type PesquisaEmpresasRequest = z.infer<typeof PesquisaEmpresasRequestSchema>
export type PesquisaEmpresasResponse = z.infer<typeof PesquisaEmpresasResponseSchema>


export class PesquisaEmpresas {
  private readonly api: WebPostoApi

  constructor(api: WebPostoApi) {
    this.api = api;
  }

  async executa(request: PesquisaEmpresasRequest): Promise<PesquisaEmpresasResponse> {
    const parsedData = PesquisaEmpresasRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw WebPostoError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.get('/INTEGRACAO/EMPRESAS', {
      params: parsedData.data
    });
  }
}

