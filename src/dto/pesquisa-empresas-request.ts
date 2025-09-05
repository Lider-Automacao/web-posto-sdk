import z from "zod";
import { QuerySchema } from "../types";

export const PesquisaEmpresasRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
});


export type PesquisaEmpresasRequest = z.infer<typeof PesquisaEmpresasRequestSchema>;
