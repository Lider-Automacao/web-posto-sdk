import z from "zod";
import { VendaSchema } from "../models";
import { ResponseSchema } from "../types";

const PesquisaVendasResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
});

export type PesquisaVendasResponse = z.infer<typeof PesquisaVendasResponseSchema>;
