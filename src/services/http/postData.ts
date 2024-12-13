import { AxiosRequestConfig } from 'axios';

import { apiRequester, setRequestDefaultHeader } from './apiRequestor';
import handleAxiosError from './handleAxiosError';

const bracket = {};

// 보내는 요청 타입 K
// 받는 응답 타입 T

export const postData = async <K, T>(
  url: string,
  data?: K,
  signal?: AbortSignal,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const modifiedConfig = setRequestDefaultHeader(config || bracket, signal);

    const response = await apiRequester.post<T>(url, data, modifiedConfig);

    return response.data;
  } catch (err: unknown) {
    throw handleAxiosError(err);
  }
};
