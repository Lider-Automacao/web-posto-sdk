import { VendaSchema } from "@/models";
import { ResponseSchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

const PesquisaVendaPorCodigoResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
});
export type PesquisaVendaPorCodigoResponse = z.infer<typeof PesquisaVendaPorCodigoResponseSchema>;
