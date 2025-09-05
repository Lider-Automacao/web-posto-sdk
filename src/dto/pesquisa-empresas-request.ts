import { QuerySchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

export const PesquisaEmpresasRequestSchema = QuerySchema.extend({
  empresaCodigo: z.number().nullish(),
});


export type PesquisaEmpresasRequest = z.infer<typeof PesquisaEmpresasRequestSchema>;
