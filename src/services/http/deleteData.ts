import { AxiosRequestConfig } from 'axios';
import handleAxiosError from './handleAxiosError';
import { apiRequester, setRequestDefaultHeader } from './apiRequestor';

const bracket = {};

export const deleteData = async <T>(
  url: string,
  signal?: AbortSignal,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket, signal);
    const response = await apiRequester.delete<T>(url, modifiedConfig);

    return response.data;
  } catch (err: unknown) {
    throw handleAxiosError(err);
  }
};
