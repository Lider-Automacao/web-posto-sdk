import { isAssigned } from '@raicamposs/toolkit';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { WebPostoError } from '../errors/web-posto.error';
import { Credenciais } from './credenciais-api';

export class WebPostoApi {
  private readonly client: AxiosInstance;
  private readonly chave: string;

  constructor({ url, chave }: Credenciais) {
    this.chave = chave;
    this.client = axios.create({
      baseURL: url,
      params: { chave },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private withKeyConfig(config?: AxiosRequestConfig): AxiosRequestConfig | undefined {
    if (!isAssigned(config)) {
      return undefined;
    }

    return {
      ...config,
      params: {
        ...config.params,
        chave: this.chave,
      },
    };
  }

  async post<T, U>(path: string, data?: T, config?: AxiosRequestConfig): Promise<U> {
    const finalConfig = this.withKeyConfig(config);
    try {
      const response = await this.client.post<U>(path, data, finalConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'POST');
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const finalConfig = this.withKeyConfig(config);
    try {
      const response = await this.client.get<T>(path, finalConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'GET');
    }
  }

  async put<T>(path: string, data?: T, config?: AxiosRequestConfig): Promise<T> {
    const finalConfig = this.withKeyConfig(config);
    try {
      const response = await this.client.put<T>(path, data, finalConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'PUT');
    }
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const finalConfig = this.withKeyConfig(config);
    try {
      const response = await this.client.delete<T>(path, finalConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'DELETE');
    }
  }

  private handleError(error: unknown, path: string, method: string): WebPostoError {
    if (axios.isAxiosError(error)) {
      return WebPostoError.fromApiResponse(error);
    }
    return new WebPostoError(`Error making ${method} request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}