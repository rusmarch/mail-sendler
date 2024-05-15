import axios from 'axios';

// export const apiUrl = import.meta.env.API_BASE_URL;
export const apiUrl = `http://68.183.74.14:4005/api`;

export const $api = axios.create({
   withCredentials: true,
   baseURL: apiUrl,
});

$api.interceptors.request.use((config) => {
   const userDataString = localStorage.getItem('userData');

   if (userDataString) {
      const userData = JSON.parse(userDataString);
      config.headers.Authorization =
         `Basic ${btoa(`${userData.username}:${userData.password}`)}`;
   }

   return config;
});
