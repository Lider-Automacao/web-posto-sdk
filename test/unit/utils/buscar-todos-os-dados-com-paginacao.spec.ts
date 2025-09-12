import { describe, expect, it } from "vitest";
import { buscarTodosOsDadosComPaginacao, buscarTodosOsDadosComPaginacaoStream } from '../../../src/utils/buscar-todos-os-dados-com-paginacao';

interface MockItem {
  id: number;
  nome: string;
}

const createMockApiRequest = (totalItems: number, limit: number) => {
  return async (params: { ultimoCodigo?: number | null, limite: number }): Promise<{ resultados: MockItem[], ultimoCodigo?: number | null }> => {
    const allItens = Array.from({ length: totalItems }).map((_, index) => ({ id: index + 1, nome: `Item ${index + 1}` }));
    const page = allItens.slice(params.ultimoCodigo || 0, params.ultimoCodigo ? params.ultimoCodigo + params.limite : params.limite ?? limit);
    return {
      resultados: page,
      ultimoCodigo: page.length > 0 ? page[page.length - 1].id : null,
    };
  };
};

describe('Testes de Paginação', () => {

  describe('buscarTodosOsDadosComPaginacao', () => {

    it('should return all paginated data as a single array', async () => {
      const mockRequest = createMockApiRequest(30, 10);
      const initialParams = {};

      const allItems = await buscarTodosOsDadosComPaginacao<MockItem, {}>(mockRequest, initialParams, 10);

      expect(allItems.length).toBe(30);
      expect(allItems[0]).toEqual({ id: 1, nome: 'Item 1' });
      expect(allItems[29]).toEqual({ id: 30, nome: 'Item 30' });
    });

    it('should handle an empty response from the API', async () => {
      const mockRequest = createMockApiRequest(0, 10);
      const initialParams = {};

      const allItems = await buscarTodosOsDadosComPaginacao<MockItem, {}>(mockRequest, initialParams, 10);

      expect(allItems).toEqual([]);
    });

    it('should handle a response with fewer items than the limit', async () => {
      const mockRequest = createMockApiRequest(5, 10);
      const initialParams = {};

      const allItems = await buscarTodosOsDadosComPaginacao<MockItem, {}>(mockRequest, initialParams, 10);

      expect(allItems.length).toBe(5);
      expect(allItems[4]).toEqual({ id: 5, nome: 'Item 5' });
    });
  });

  describe('buscarTodosOsDadosComPaginacaoStream', () => {
    it('should yield each item from the paginated data one by one', async () => {
      const mockRequest = createMockApiRequest(15, 5);
      const initialParams = {};
      const receivedItems: MockItem[] = [];

      const iterator = buscarTodosOsDadosComPaginacaoStream<MockItem, {}>(mockRequest, initialParams, 5);

      for await (const item of iterator) {
        receivedItems.push(item);
      }

      expect(receivedItems.length).toBe(15);
      expect(receivedItems[0]).toEqual({ id: 1, nome: 'Item 1' });
      expect(receivedItems[14]).toEqual({ id: 15, nome: 'Item 15' });
    });

    it('should handle an empty stream', async () => {
      const mockRequest = createMockApiRequest(0, 10);
      const initialParams = {};
      const receivedItems: MockItem[] = [];

      const iterator = buscarTodosOsDadosComPaginacaoStream<MockItem, {}>(mockRequest, initialParams, 10);

      for await (const item of iterator) {
        receivedItems.push(item);
      }

      expect(receivedItems).toEqual([]);
    });

  });
});