import { faker } from '@faker-js/faker';
import { CPF } from '@raicamposs/toolkit';
import { describe, expect, it } from "vitest";
import { ClienteSchema, WebPostoSDK } from "../../src";

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

  it("Deve pesquisar as empresas", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const data = await sdk.empresa.pesquisaTodos();

    expect(data).toBeDefined();
    expect(data.length).greaterThan(0);
  });


  it("Deve cadastrar um Cliente", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const cliente = buildClient()
    const result = await sdk.cliente.cadastra({ cliente });

    expect(result).toBeDefined();
    expect(result.codCliente).greaterThan(0);
  });

  it("Deve pesquisar as atualiza as unidades de negocio", async () => {
    const sdk = new WebPostoSDK(credenciais);
    const cliente = buildClient()

    const empresas = await sdk.empresa.pesquisaTodos()
    const { codCliente } = await sdk.cliente.cadastra({ cliente });

    for (const empresa of empresas) {
      await sdk.cliente.atualizaUnidadeNegocio({
        empresaCodigo: empresa.codigo,
        clienteCodigo: codCliente,
        ativo: true,
      })
    }
  }, 20_000);

});

const buildClient = () => {
  return ClienteSchema.parse({
    "cnpjCpf": CPF.random().value,
    "rg": null,
    "nomeFantasia": faker.person.middleName(),
    "tipoInscricaoEstadual": 3,
    "inscricaoEstadual": null,
    "razaoSocial": faker.person.fullName(),
    "tipoPessoa": "F",
    "enderecoTipoLogradouro": "Rua",
    "enderecoLogradouro": "AVENIDA ANTÔNIO GUIMARÃES",
    "enderecoNumero": "90",
    "enderecoComplemento": "",
    "enderecoBairro": "ITAPEBUSSU",
    "enderecoCidade": "GUARAPARI",
    "enderecoUf": "ES",
    "enderecoCep": "29.210-190",
    "clienteCodigoExterno": null,
    "clienteSuspenso": false,
    "motivoClienteSuspenso": "",
    "clienteLimite": false,
    "valorClienteLimite": 0,
    "valorClienteLimiteDisponivel": 0,
    "exigeCentroCusto": false,
    "documentosEmitidos": -1,
    "centrosCustoCliente": [],
    "clienteContato": []
  })
}