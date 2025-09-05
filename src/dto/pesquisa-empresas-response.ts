import { EmpresaSchema } from "@/models/empresa";
import { ResponseSchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

const PesquisaEmpresasResponseSchema = ResponseSchema.extend({
  resultados: z.array(EmpresaSchema).default([]),
});
export type PesquisaEmpresasResponse = z.infer<typeof PesquisaEmpresasResponseSchema>;
