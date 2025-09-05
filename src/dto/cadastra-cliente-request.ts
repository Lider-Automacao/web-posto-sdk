import { ClienteSchema } from "@/models";
import z from "zod/v4/classic/external.cjs";

export const CadastraClienteRequestSchema = z.object({
  cliente: ClienteSchema,
})

export type CadastraClienteRequest = z.infer<typeof CadastraClienteRequestSchema>;
