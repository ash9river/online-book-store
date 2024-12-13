import { AxiosRequestConfig, isAxiosError } from 'axios';
import { apiRequester, setRequestDefaultHeader } from './apiRequestor';
import handleAxiosError from './handleAxiosError';

const bracket = {};

export const getData = async <T>(
  url: string,
  signal?: AbortSignal,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket, signal);
    const response = await apiRequester.get<T>(url, modifiedConfig);

    return response.data;
  } catch (err: unknown) {
    throw handleAxiosError(err);
  }
};
