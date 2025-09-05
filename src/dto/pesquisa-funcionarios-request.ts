import { QuerySchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

export const PesquisaFuncionariosRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
  funcionarioCodigo: z.number().nullish(),
});
export type PesquisaFuncionariosRequest = z.infer<typeof PesquisaFuncionariosRequestSchema>;
