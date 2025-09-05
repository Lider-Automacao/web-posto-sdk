import { describe, expect, it } from "vitest";
import { WebPostoSDK } from "../../src";

require('dotenv').config()

describe("WebPostoSDK", () => {
  const credenciais = {
    chave: process.env.CHAVE ?? 'ANY',
  };

  it("Deve pesquisar as data", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const data = await sdk.empresa.pesquisaTodos({
      limite: 1
    });

    expect(data).toBeDefined();
    expect(data.length).equals(2);
  });

  it("Deve pesquisar os títulos a receber", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const data = await sdk.titulo.pesquisaTodos({
      limite: 1_000,
      dataFiltro: 'MOVIMENTO',
      dataInicial: '2025-01-01',
      dataFinal: '2025-02-01',
    });

    expect(data).toBeDefined();
    expect(data.length).greaterThan(0);
  });

  it("Deve pesquisar as funcionário", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const data = await sdk.funcionario.pesquisaTodos();

    expect(data).toBeDefined();
    expect(data.length).greaterThan(0);
  });

  it("Deve pesquisar as vendas", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const data = await sdk.vendas.pesquisaTodos({
      limite: 1_000,
      dataInicial: '2025-01-01',
      dataFinal: '2025-02-01',
      tipoData: 'EMISSAO'
    });

    expect(data).toBeDefined();
    expect(data.length).greaterThan(0);
  });
});