import { z } from 'zod';

export const TituloReceberSchema = z.object({
  empresaCodigo: z.number(),
  tituloCodigo: z.number(),
  dataMovimento: z.date(),
  dataVencimento: z.date(),
  valor: z.number(),
  vendaCodigo: z.number(),
  duplicataCodigo: z.number().nullable(),
  tipo: z.enum(['Empréstimo', 'Nota']),
  pendente: z.boolean(),
  clienteCodigo: z.number(),
  dataPagamento: z.null(),
  planoContaGerencialCodigo: z.number().nullable(),
  nomeCliente: z.string(),
  cpfCnpjCliente: z.string(),
  convertido: z.boolean(),
  documento: z.string().nullable(),
  tituloNumero: z.number(),
  codigo: z.number(),
});

export type TituloReceber = z.infer<typeof TituloReceberSchema>;