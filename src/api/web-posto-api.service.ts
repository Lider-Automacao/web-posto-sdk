
import { isAssigned } from '@raicamposs/toolkit';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { WebPostoError } from '../errors/web-posto.error';
import { Credenciais } from './credenciais-api';

export class WebPostoApi {
  private readonly client: AxiosInstance;
  private readonly chave: string

  constructor({ url, chave }: Credenciais) {
    this.chave = chave
    this.client = axios.create({
      baseURL: url,
      params: { chave },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async post<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    if (isAssigned(config)) {
      config.params = { ...config.params, chave: this.chave };
    }

    try {
      const response = await this.client.post<U>(path, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw WebPostoError.fromApiResponse(error);
      }
      throw new WebPostoError(`Error making POST request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    if (isAssigned(config)) {
      config.params = { ...config.params, chave: this.chave };
    }


    try {
      const response = await this.client.get<T>(path, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw WebPostoError.fromApiResponse(error);
      }
      throw new WebPostoError(`Error making GET request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async put<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    if (isAssigned(config)) {
      config.params = { ...config.params, chave: this.chave };
    }

    try {
      const response = await this.client.put<U>(path, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw WebPostoError.fromApiResponse(error);
      }
      throw new WebPostoError(`Error making PUT request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }


  async delete<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    if (isAssigned(config)) {
      config.params = { ...config.params, chave: this.chave };
    }

    try {
      const response = await this.client.delete<T>(path, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw WebPostoError.fromApiResponse(error);
      }
      throw new WebPostoError(`Error making DELETE request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }

}

