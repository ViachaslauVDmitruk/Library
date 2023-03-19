import axiosAPI, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const axios = axiosAPI.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const onRequest = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
};

const onRequestError = (error: Error & AxiosError) => Promise.reject(error);

const onResponse = (response: AxiosResponse) => response;

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/auth');
  }

  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);
