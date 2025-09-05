import z from "zod"

export const FuncionarioSchema = z.object({
  empresaCodigo: z.number(),
  funcionarioCodigo: z.number(),
  funcionarioCodigoExterno: z.string(),
  funcionarioReferencia: z.string(),
  nome: z.string(),
  funcaoCodigo: z.number(),
  admissao: z.date(),
  demissao: z.date(),
  ultimoUsuarioAlteracao: z.string(),
  codigo: z.number(),
})

export type Funcionarios = z.infer<typeof FuncionarioSchema>

