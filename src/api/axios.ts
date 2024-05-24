import axios from 'axios';

export const apiUrl = `http://68.183.74.14:4005/api`;

export const $api = axios.create({
  baseURL: apiUrl,
});

// request interceptor
$api.interceptors.request.use((config) => {
  const userDataString = localStorage.getItem('userData');

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    config.headers.Authorization = `Basic ${btoa(`${userData.username}:${userData.password}`)}`;
  }

  return config;
});
