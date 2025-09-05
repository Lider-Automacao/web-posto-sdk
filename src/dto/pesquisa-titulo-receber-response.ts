import { TituloReceberSchema } from "@/models";
import { ResponseSchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

const PesquisaTituloReceberResponseSchema = ResponseSchema.extend({
  resultados: z.array(TituloReceberSchema).default([]),
});

export type PesquisaTituloReceberResponse = z.infer<typeof PesquisaTituloReceberResponseSchema>;
