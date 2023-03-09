/* eslint-disable no-param-reassign */

import axiosAPI, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const axios = axiosAPI.create();

const onRequest = (config: AxiosRequestConfig) => {
  const token = Cookies.get('token');

  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

const onRequestError = (error: AxiosError) => error;

const onResponse = (response: AxiosResponse) => response;

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 403) {
    Cookies.remove('token');
    sessionStorage.removeItem('user');
    window.location.replace('/auth');
  }

  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);
