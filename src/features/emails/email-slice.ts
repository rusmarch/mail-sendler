import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { emailService } from "./email-service";
import { Email, EmailListResponse, SendEmailRequest } from "../../types/mails";

type emailsState = {
   email: Email | null,
   allEmails: Email[] | null;
}

const initialState: emailsState = {
   email: null,
   allEmails: null,
}

export const sendEmail = createAsyncThunk<Email, SendEmailRequest>(
   'emails/sendEmail',
   async (request: SendEmailRequest, { rejectWithValue }) => {
      try {
         const response = await emailService.sendEmail(request);
         return response;
      } catch (err: any) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllEmails = createAsyncThunk<EmailListResponse>(
   'emails/getAllEmails',
   async (_, { rejectWithValue }) => {
      try {
         const response = await emailService.getAllEmails();
         return response;
      } catch (err: any) {
         if (!err.response) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
)

export const emailSlice = createSlice({
   name: 'emails',
   initialState,
   reducers: {
      // logout: (state) => {
      //    state.user = null;
      // }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllEmails.fulfilled, (state, action) => {
            state.allEmails = action.payload.results;
         })
         // .addCase(getAllEmails.fulfilled, (state, action) => {
         //    state.allEmails = action.payload.results;
         // })
   }
});

// export const { logout } = authSlice.actions;
export default emailSlice.reducer;