import z from 'zod/v4'

export const CentroCustoClienteSchema = z.object({
  descricao: z.string(),
  ativo: z.boolean(),
})

export type CentroCustoCliente = z.infer<typeof CentroCustoClienteSchema>
