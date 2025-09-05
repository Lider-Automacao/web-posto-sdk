import z from "zod";
import { QuerySchema } from "../types";

export const PesquisaFuncionariosRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
  funcionarioCodigo: z.number().nullish(),
});
export type PesquisaFuncionariosRequest = z.infer<typeof PesquisaFuncionariosRequestSchema>;
