
import z from "zod";
import { ClienteSchema } from "../models";

export const CadastraClienteRequestSchema = z.object({
  cliente: ClienteSchema,
})

export type CadastraClienteRequest = z.infer<typeof CadastraClienteRequestSchema>;
