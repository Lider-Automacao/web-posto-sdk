import z from "zod"

export const EmpresaSchema = z.object({
  codigo: z.number(),
  empresaCodigo: z.number(),
  cnpj: z.string(),
  razao: z.string(),
  fantasia: z.string(),
  endereco: z.string(),
  bairro: z.string(),
  cep: z.string(),
  cidade: z.string(),
  estado: z.string(),
  ultimoUsuarioAlteracao: z.string(),
  centroCustoPrincipal: z.number().nullish(),
  empresaCodigoExterno: z.number().nullish(),
})

export type Empresa = z.infer<typeof EmpresaSchema>
