/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import axiosAPI, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const axios = axiosAPI.create({ withCredentials: true });

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
};

const onRequestError = (error: AxiosError) => error;

const onResponse = (response: AxiosResponse) => response;

const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 403) {
    //  Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/auth');
  }

  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);
