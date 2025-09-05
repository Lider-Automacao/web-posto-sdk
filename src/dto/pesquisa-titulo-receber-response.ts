import z from "zod";
import { TituloReceberSchema } from "../models";
import { ResponseSchema } from "../types";

const PesquisaTituloReceberResponseSchema = ResponseSchema.extend({
  resultados: z.array(TituloReceberSchema).default([]),
});

export type PesquisaTituloReceberResponse = z.infer<typeof PesquisaTituloReceberResponseSchema>;
