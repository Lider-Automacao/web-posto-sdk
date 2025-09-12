import { Nullable } from "@raicamposs/toolkit";


type RequestParams<Q> = Q & {
  ultimoCodigo?: number | null;
  limite: number;
};

type Request<Q, T> = (params: RequestParams<Q>) => Promise<{
  resultados: T[];
  ultimoCodigo?: number | null;
}>;

export const buscarTodosOsDadosComPaginacao = async <T, Q extends object>(
  request: Request<Q, T>,
  initialParams: Q,
  limite = 1_000
) => {
  const output: T[] = [];
  let hasNext = true;
  let ultimoCodigo: Nullable<number> = null;

  while (hasNext) {
    const requestParams: RequestParams<Q> = {
      ...initialParams,
      ultimoCodigo,
      limite,
    };

    const { resultados, ultimoCodigo: novoUltimoCodigo } = await request(requestParams);

    output.push(...resultados);
    ultimoCodigo = novoUltimoCodigo;
    hasNext = resultados.length > 0;
  }

  return output;
};


export const buscarTodosOsDadosComPaginacaoStream = async function*<T, Q extends object>(
  request: Request<Q, T>,
  initialParams: Q,
  limite = 1_000
) {
  let hasNext = true;
  let ultimoCodigo: Nullable<number> = null;

  while (hasNext) {
    const requestParams: RequestParams<Q> = {
      ...initialParams,
      ultimoCodigo,
      limite,
    };

    const { resultados, ultimoCodigo: novoUltimoCodigo } = await request(requestParams);

    ultimoCodigo = novoUltimoCodigo;
    hasNext = resultados.length > 0;

    for (const titulo of resultados) {
      yield titulo;
    }
  }
};