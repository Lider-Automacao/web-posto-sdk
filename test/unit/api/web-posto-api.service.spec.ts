import axios, { AxiosInstance } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Credenciais } from '../../../src/api/credenciais-api';
import { WebPostoApi } from '../../../src/api/web-posto-api.service';
import { WebPostoError } from '../../../src/errors/web-posto.error';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  create: any
  isAxiosError: any
};

describe('WebPostoApi', () => {
  let api: WebPostoApi;
  let clientMock: Record<string, any>;

  const credenciais: Credenciais = {
    url: 'http://localhost',
    chave: "f39c5859-3609-4ebe-a764-1109b26c28aa",
  };

  beforeEach(() => {
    clientMock = {
      post: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
    mockedAxios.create.mockReturnValue(clientMock);
    api = new WebPostoApi(credenciais);
  });

  it('should initialize axios client with correct config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: credenciais.url,
      params: { chave: credenciais.chave },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should perform a successful POST request', async () => {
    clientMock.post.mockResolvedValue({ data: { result: 'ok' } });
    const result = await api.post<{ foo: string }, { result: string }>('/path', { foo: 'bar' });
    expect(clientMock.post).toHaveBeenCalledWith('/path', { foo: 'bar' }, undefined);
    expect(result).toEqual({ result: 'ok' });
  });

  it('should perform a successful GET request', async () => {
    clientMock.get.mockResolvedValue({ data: { foo: 'bar' } });
    const result = await api.get<{ foo: string }>('/path');
    expect(clientMock.get).toHaveBeenCalledWith('/path', undefined);
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should perform a successful PUT request', async () => {
    clientMock.put.mockResolvedValue({ data: { updated: true } });
    const result = await api.put<{ foo: string }, { updated: boolean }>('/path', { foo: 'bar' });
    expect(clientMock.put).toHaveBeenCalledWith('/path', { foo: 'bar' }, undefined);
    expect(result).toEqual({ updated: true });
  });

  it('should perform a successful DELETE request', async () => {
    clientMock.delete.mockResolvedValue({ data: { deleted: true } });
    const result = await api.delete<{ deleted: boolean }>('/path');
    expect(clientMock.delete).toHaveBeenCalledWith('/path', undefined);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw WebPostoError on POST axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(true);
    clientMock.post.mockRejectedValue(error);
    vi.spyOn(WebPostoError, 'fromApiResponse').mockReturnValue(new WebPostoError('api error'));
    await expect(api.post('/fail', {})).rejects.toThrow(WebPostoError);
  });

  it('should throw WebPostoError on GET non-axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(false);
    clientMock.get.mockRejectedValue(error);
    await expect(api.get('/fail')).rejects.toThrow(WebPostoError);
  });

  it('should throw WebPostoError on PUT axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(true);
    clientMock.put.mockRejectedValue(error);
    vi.spyOn(WebPostoError, 'fromApiResponse').mockReturnValue(new WebPostoError('api error'));
    await expect(api.put('/fail', {})).rejects.toThrow(WebPostoError);
  });

  it('should throw WebPostoError on DELETE non-axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(false);
    clientMock.delete.mockRejectedValue(error);
    await expect(api.delete('/fail')).rejects.toThrow(WebPostoError);
  });

  it('getClient should return the axios instance', () => {
    expect(api.getClient()).toBe(clientMock as unknown as AxiosInstance);
  });
});