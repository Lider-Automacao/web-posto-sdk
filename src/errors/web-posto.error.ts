// src/utils/sdkError.ts

import { isNullOrUndefined, ObjectEntries } from '@raicamposs/toolkit';
import { AxiosError, HttpStatusCode } from 'axios';
import * as zPT from 'zod/v4';
import { flattenError, ZodError } from 'zod/v4';
import { DicionarioDeErros } from './erros';

zPT.config(zPT.locales.pt())


interface WebPostoErrorDetails {
  statusCode?: number;
  apiResponse?: unknown;
  message: string;
  description?: string | object;
}

export class WebPostoError extends Error {
  name: string;
  originalError: Error | AxiosError | null;
  details: WebPostoErrorDetails | null;

  constructor(message: string, originalError: Error | AxiosError | null = null, details: WebPostoErrorDetails | null = null) {
    super(message);
    this.name = WebPostoError.name;
    this.originalError = originalError;
    this.details = details;
    Object.setPrototypeOf(this, WebPostoError.prototype);
  }

  static fromValidation(message: string, validationDetails: string): WebPostoError {
    return new WebPostoError(
      message,
      null,
      { statusCode: HttpStatusCode.NotAcceptable, message, description: validationDetails, }
    );
  }

  static fromZodError(message: string, exception: ZodError): WebPostoError {
    return new WebPostoError(
      message,
      exception,
      {
        statusCode: HttpStatusCode.NotAcceptable,
        message,
        description: flattenError(exception)
      }
    );
  }


  private static handleData(data: unknown) {
    let message = 'Ocorreu um erro no servidor do WebPostoApi.';
    let description = '';

    if (isNullOrUndefined(data)) {
      return { message, description }
    }

    if (typeof data !== 'object') {
      description = JSON.stringify(data)

      for (const [key, element] of ObjectEntries(DicionarioDeErros)) {
        if (key.includes(description)) {
          return element
        }
      }

      return { message, description }
    }

    if (Array.isArray(data)) {
      description = data.join('\n')
      return { message, description }
    }


    if ('message' in data && typeof data['message'] === 'string')
      message = data['message']

    return { message, description }
  }

  static fromApiResponse(error: AxiosError): WebPostoError {
    if (error.response) {
      const { status, data } = error.response;
      let { message, description } = this.handleData(data);

      switch (status) {
        case 400:
          message = message || 'Dados de requisição inválidos.';
          break;
        case 401:
          message = 'Autenticação falhou. Token inválido ou expirado.';
          break;
        case 404:
          message = 'Recurso não encontrado.';
          break;
        case 500:
          message = 'Erro interno do servidor.';
          break;
        default:
          message = `Erro no servidor (${status}).`;
      }

      const errorDetails: WebPostoErrorDetails = {
        statusCode: status,
        apiResponse: data,
        message: message,
        description: description,
      };

      return new WebPostoError(message, error, errorDetails);
    } else if (error.request) {
      return new WebPostoError(
        'Não foi possível se conectar à WebPostoApi. Verifique sua conexão.',
        error,
        {
          message: 'Erro de conexão com a WebPostoApi.',
          description: 'O servidor pode estar offline ou inacessível.',
        }
      );
    } else {
      return new WebPostoError(
        'Erro ao configurar a requisição para a WebPostoApi.',
        error,
        {
          message: error.message,
          description: 'Verifique a configuração do seu Axios.',
        }
      );
    }
  }
}


