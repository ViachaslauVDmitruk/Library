/* eslint-disable no-param-reassign */

import axiosAPI, { AxiosRequestConfig } from 'axios';
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

axios.interceptors.request.use(onRequest);
