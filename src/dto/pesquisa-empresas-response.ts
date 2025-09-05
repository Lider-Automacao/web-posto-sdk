import z from "zod";
import { EmpresaSchema } from "../models/empresa";
import { ResponseSchema } from "../types";

const PesquisaEmpresasResponseSchema = ResponseSchema.extend({
  resultados: z.array(EmpresaSchema).default([]),
});
export type PesquisaEmpresasResponse = z.infer<typeof PesquisaEmpresasResponseSchema>;
