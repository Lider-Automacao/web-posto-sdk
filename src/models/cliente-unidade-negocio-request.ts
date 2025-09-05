import * as z from 'zod'

export const ClienteUnidadeNegocioSchema = z.object({
  empresaCodigo: z.number(),
  clienteCodigo: z.number(),
  ativo: z.boolean(),
})
export type ClienteUnidadeNegocio = z.infer<
  typeof ClienteUnidadeNegocioSchema
>
