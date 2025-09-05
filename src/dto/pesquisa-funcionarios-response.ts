import z from "zod";
import { FuncionarioSchema } from "../models";
import { ResponseSchema } from "../types";

const PesquisaFuncionariosResponseSchema = ResponseSchema.extend({
  resultados: z.array(FuncionarioSchema).default([]),
});

export type PesquisaFuncionariosResponse = z.infer<typeof PesquisaFuncionariosResponseSchema>;
