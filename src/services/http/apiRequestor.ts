import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const apiRequester: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export const setRequestDefaultHeader = (
  requestconfig: AxiosRequestConfig,
  signal?: AbortSignal,
) => {
  const config = requestconfig;

  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (signal) {
    config.signal = signal;
  }

  return config;
};
