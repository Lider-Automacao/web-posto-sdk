import z from "zod";
import { VendaSchema } from "../models";
import { ResponseSchema } from "../types";

const PesquisaVendaPorCodigoResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
});
export type PesquisaVendaPorCodigoResponse = z.infer<typeof PesquisaVendaPorCodigoResponseSchema>;
