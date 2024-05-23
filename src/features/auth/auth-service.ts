import axios from 'axios';
import {
   CreateUserRequest,
   CreateUserResponse,
   RetrieveUserResponse,
} from 'src/types/auth';

export const apiUrl = `http://68.183.74.14:4005/api`;

const createUser = async (request: CreateUserRequest) => {
   const response = await axios.post<CreateUserResponse>(`${apiUrl}/users/`, request);
   return response.data;
}

const retrieveUser = async () => {
   let basicAuth;
   const userDataString = localStorage.getItem('userData');

   if (userDataString) {
      const userData = JSON.parse(userDataString);
      basicAuth = `Basic ${btoa(`${userData.username}:${userData.password}`)}`;
   }
   const response = await axios.get<RetrieveUserResponse>(`${apiUrl}/users/current/`, {
      headers: { Authorization: basicAuth }
   });

   return response.data;
}

export const authService = {
   createUser,
   retrieveUser,
};