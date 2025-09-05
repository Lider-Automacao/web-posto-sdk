# @liderautomacao/web-posto-sdk

*A maneira mais simples e eficiente de integrar com a API Web Posto.*

## Visão Geral

Este SDK (Software Development Kit) foi projetado para simplificar a interação com a API Web Posto, abstraindo a complexidade das chamadas HTTP e fornecendo um conjunto de métodos e modelos de dados tipados para agilizar o desenvolvimento. Com ele, você pode facilmente consultar e manipular dados de empresas, funcionários, vendas, títulos e muito mais.

## Tecnologias Utilizadas

- **TypeScript**: Para um código mais seguro, legível e com autocompletar inteligente.
- **Axios**: Para a realização das requisições HTTP para a API.
- **Zod**: Para validação robusta dos dados de entrada e saída, garantindo a integridade das informações.

## Instalação

Para adicionar o SDK ao seu projeto, utilize o `npm` ou outro gerenciador de pacotes de sua preferência:

```bash
npm install @liderautomacao/web-posto-sdk
```

## Uso

Primeiro, importe e instancie o `WebPostoSDK`, fornecendo as credenciais de acesso à API.

```typescript
import { WebPostoSDK } from '@liderautomacao/web-posto-sdk';

// Configuração das credenciais
const sdk = new WebPostoSDK({
  chave: 'SEU_TOKEN_DE_AUTENTICACAO',
});
```

Após a inicialização, você pode utilizar os serviços disponíveis para interagir com a API.

### Exemplo: Pesquisando Empresas

```typescript
import { WebPostoSDK } from '@liderautomacao/web-posto-sdk';

const sdk = new WebPostoSDK({
  chave: 'SEU_TOKEN_DE_AUTENTICACAO',
});

async function buscarEmpresas() {
  try {
    console.log('Buscando empresas...');
    const response = await sdk.empresa.pesquisa({
      // Você pode adicionar filtros de pesquisa aqui
      // Ex: empresaCodigoExterno: 12345
    });

    console.log('Ultimo código retornado:', response.ultimoCodigo);
    console.log('Resultados:', response.resultados);
  } catch (error) {
    console.error('Ocorreu um erro ao buscar empresas:', error);
  }
}

buscarEmpresas();
```

## Recursos Futuros

- [ ] Adicionar suporte a todos os endpoints restantes da API Web Posto.
- [ ] Aumentar a cobertura de testes para garantir ainda mais estabilidade.

## Contribuição

Sua contribuição é muito bem-vinda! Para contribuir com o projeto, siga os passos abaixo:

1.  **Fork o repositório:** Crie uma cópia do projeto na sua conta do GitHub.
2.  **Crie uma branch:** `git checkout -b minha-feature-incrivel`.
3.  **Faça suas alterações e commite:** `git commit -m 'Adiciona minha feature incrível'`.
4.  **Envie para o seu fork:** `git push origin minha-feature-incrivel`.
5.  **Abra um Pull Request:** Envie suas alterações para o repositório original.

Para reportar bugs ou sugerir novas funcionalidades, por favor, abra uma [Issue](https://github.com/Lider-Automacao/sdk-quality/issues).

## Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo `LICENSE` para mais detalhes.
