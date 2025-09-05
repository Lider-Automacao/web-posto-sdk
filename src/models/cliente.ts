
import { coalesce, isEmpty } from '@raicamposs/toolkit'
import z from 'zod/v4'
import { CentroCustoClienteSchema } from './centro-custo-cliente'
import { ContatoClienteSchema } from './contato-cliente'

export const EnderecoCepSchema = z
  .string()
  .nullish()
  .optional()
  .transform((value: string | null | undefined) => {
    let postalCode: string = coalesce(value, '').replace(/\D/g, '')

    if (isEmpty(postalCode)) {
      return null
    }

    postalCode = postalCode
      .toString()
      .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')
    return postalCode
  })

export const TelefoneSchema = z
  .string()
  .nullish()
  .optional()
  .transform((value: string | null | undefined) => {
    const phone = coalesce(value, '').replace(/\D/g, '')

    if (isEmpty(phone)) {
      return null
    }

    if (phone.length <= 10) {
      const output = phone.replace(/(\d{2})(\d{4})(\d+)/, '($1)$2-$3')
      return output
    }
    const output = phone.replace(/(\d{2})(\d{5})(\d+)/, '($1)$2-$3')
    return output
  })

export const ClienteSchema = z.object({
  cnpjCpf: z.string(),
  rg: z.string().nullish().optional(),
  nomeFantasia: z.string().default(''),
  tipoInscricaoEstadual: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  inscricaoEstadual: z.string().nullish().optional(),
  razaoSocial: z.string(),
  tipoPessoa: z.enum(['F', 'J']),
  enderecoTipoLogradouro: z.string(),
  enderecoLogradouro: z.string(),
  enderecoNumero: z.string().default('S/N'),
  enderecoComplemento: z.string().nullish().optional(),
  enderecoBairro: z.string().nullish().optional(),
  enderecoCidade: z.string(),
  enderecoUf: z.string(),
  enderecoCep: EnderecoCepSchema,
  clienteCodigoExterno: z.string().nullish().optional(),
  clienteSuspenso: z.boolean().default(false),
  motivoClienteSuspenso: z.string().nullish().optional(),
  clienteLimite: z.boolean().default(true),
  valorClienteLimite: z.coerce.number().default(0),
  valorClienteLimiteDisponivel: z.coerce.number().default(0),
  exigeCentroCusto: z.boolean().default(false),
  documentosEmitidos: z
    .union([z.literal(-1), z.literal(1), z.literal(2)])
    .default(-1),
  grupoCodigo: z.number().nullish().optional().meta({
    title: 'Grupo de Cliente',
    description:
      'ID do código do grupo de cliente para realizar vinculo com o cliente cadastrado/alterado.',
  }),
  centrosCustoCliente: z.array(CentroCustoClienteSchema).default([]),
  clienteContato: z.array(ContatoClienteSchema).default([]),
})

export type Cliente = z.infer<typeof ClienteSchema>
