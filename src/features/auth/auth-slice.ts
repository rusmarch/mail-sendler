import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./auth-service";
import {
   CreateUserRequest,
   CreateUserResponse,
   RetrieveUserResponse,
   UserState,
} from "../../types/auth";

type authState = {
   user: UserState,
   isAuth: boolean,
   isLoading: boolean,
}

const initialState: authState = {
   user: null,
   isAuth: false,
   isLoading: false,
}

export const createUser = createAsyncThunk<CreateUserResponse, CreateUserRequest>(
   'auth/createUser',
   async (request: CreateUserRequest, { rejectWithValue }) => {
      try {
         const response = await authService.createUser(request);
         localStorage.setItem('userData', JSON.stringify(response));
         return response;
      } catch (err: any) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const retrieveUser = createAsyncThunk<RetrieveUserResponse>(
   'auth/retrieveUser',
   async (_, { rejectWithValue }) => {
      try {
         const response = await authService.retrieveUser();
         localStorage.setItem('userData', JSON.stringify(response));
         return response;
      } catch (err: any) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.isLoading = false;
         state.isAuth = false;
         state.user = null;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(retrieveUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
         })
   }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;