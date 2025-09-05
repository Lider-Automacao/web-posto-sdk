import { FuncionarioSchema } from "@/models";
import { ResponseSchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

const PesquisaFuncionariosResponseSchema = ResponseSchema.extend({
  resultados: z.array(FuncionarioSchema).default([]),
});

export type PesquisaFuncionariosResponse = z.infer<typeof PesquisaFuncionariosResponseSchema>;
