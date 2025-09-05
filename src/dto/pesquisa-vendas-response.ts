import { VendaSchema } from "@/models";
import { ResponseSchema } from "@/types";
import z from "zod/v4/classic/external.cjs";

const PesquisaVendasResponseSchema = ResponseSchema.extend({
  resultados: z.array(VendaSchema).default([]),
});

export type PesquisaVendasResponse = z.infer<typeof PesquisaVendasResponseSchema>;
