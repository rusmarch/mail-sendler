import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'src/features/auth/auth-service';
import {
  CreateUserRequest,
  CreateUserResponse,
  RetrieveUserResponse,
  UserState,
} from 'src/types/auth';

type authState = {
  user: UserState;
};

const initialState: authState = {
  user: null,
};

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
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(retrieveUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
