import { z } from 'zod';

export const EstoqueSchema = z.object({
  produtoCodigo: z.number(),
  estoqueCodigo: z.number(),
});

export const TrocoSchema = z.object({
  valorTroco: z.number(),
  tipoTroco: z.string(),
});

export const ItemSchema = z.object({
  estoque: z.array(EstoqueSchema),
  empresaCodigo: z.number(),
  vendaCodigo: z.number(),
  vendaItemCodigo: z.number(),
  dataMovimento: z.date(),
  produtoCodigo: z.number(),
  quantidade: z.number(),
  precoCusto: z.number(),
  totalCusto: z.number(),
  precoVenda: z.number(),
  totalVenda: z.number(),
  totalDesconto: z.number(),
  totalAcrescimo: z.number(),
  bicoCodigo: z.number(),
  tanqueCodigo: z.number(),
  produtoLmcCodigo: z.number(),
  funcionarioCodigo: z.number(),
  produtoKitCodigo: z.number(),
  controleItem: z.number(),
  icmsValor: z.number(),
  icmsBase: z.number(),
  icmsAliquota: z.number(),
  cfop: z.string(),
  cst: z.string(),
  produtoCodigoExterno: z.string(),
  cstPis: z.string(),
  aliquotaPis: z.number(),
  basePis: z.number(),
  valorPis: z.number(),
  cstCofins: z.string(),
  aliquotaCofins: z.number(),
  baseCofins: z.number(),
  valorCofins: z.number(),
  tributacaoAdRem: z.number(),
  valorTributacaoAdRem: z.number(),
  codigo: z.number(),
});

export const FormaPagamentoSchema = z.object({
  gestora: z.string(),
  bandeira: z.string(),
  tipoTransacao: z.string(),
  autorizacao: z.string(),
  numeroCartao: z.string(),
  nsu: z.string(),
  administradoraCodigoExterno: z.string(),
  empresaCodigo: z.number(),
  vendaCodigo: z.number(),
  vendaPrazoCodigo: z.number(),
  dataMovimento: z.date(),
  vencimento: z.date(),
  valorPagamento: z.number(),
  taxaPercentual: z.number(),
  formaPagamentoCodigo: z.number(),
  administradoraCodigo: z.number(),
  turnoCodigo: z.number(),
  tipoFormaPagamento: z.string(),
  nomeFormaPagamento: z.string(),
  codigo: z.number(),
});

export const VendaSchema = z.object({
  empresaCodigo: z.number(),
  vendaCodigo: z.number(),
  notaCodigo: z.number(),
  funcionarioCodigo: z.number(),
  clienteCodigo: z.number(),
  destacaAcrescimoDesconto: z.number(),
  clienteCpfCnpj: z.string(),
  dataHora: z.date(),
  notaNumero: z.string(),
  notaSerie: z.string(),
  totalVenda: z.number(),
  caixaCodigo: z.number(),
  notaChave: z.string(),
  modeloDocumento: z.string(),
  cancelada: z.string(),
  placaVeiculo: z.string(),
  clienteCodigoExterno: z.string(),
  centroCustoCodigo: z.number(),
  centroCustoVeiculo: z.string(),
  identificacaoFidelidade: z.string(),
  troco: z.array(TrocoSchema),
  itens: z.array(ItemSchema),
  formaPagamento: z.array(FormaPagamentoSchema),
  codigo: z.number(),
});

export type Venda = z.infer<typeof VendaSchema>;
export type FormaPagamento = z.infer<typeof FormaPagamentoSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Troco = z.infer<typeof TrocoSchema>;
export type Estoque = z.infer<typeof EstoqueSchema>;