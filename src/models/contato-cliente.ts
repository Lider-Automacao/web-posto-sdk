import z from 'zod/v4'
import { TelefoneSchema } from './cliente'

export type ContatoCliente = z.infer<typeof ContatoClienteSchema>
export const ContatoClienteSchema = z.object({
  contatoCodigo: z.union([z.number(), z.undefined()]).optional(),
  contato: z.string(),
  setor: z.string().default('GERAL'),
  email: z.email().nullish().optional().default(null),
  telefone: TelefoneSchema,
  celular: TelefoneSchema,
  whatsapp: TelefoneSchema,
  aniversario: z.string().nullish().optional().default(null),
  recebeEmail: z.boolean(),
  recebeWhatsapp: z.boolean(),
  documentos: z.array(
    z.union([
      z.literal('DANFE'),
      z.literal('BOLETO'),
      z.literal('FATURA'),
      z.literal('CUPOM'),
      z.literal('DACTE'),
      z.literal('FATURA_FINANCEIRA'),
      z.literal('PROMISSORIA_DIGITAL'),
      z.literal('PAG_PIX'),
      z.literal('PRE_PAGO'),
    ]),
  ),
  saldoPrepago: z.boolean(),
  responsavelLegal: z.boolean(),
  contatoPrincipal: z.boolean(),
})
