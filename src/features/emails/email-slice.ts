import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { emailService } from 'src/features/emails/email-service';
import { Email, EmailListResponse, SendEmailRequest, EmailPagination } from 'src/types/mails';

type GetEmailsParams = {
  offset: number;
  limit: number;
};
type emailsState = {
  emails: Email[] | null;
  emailPagination: EmailPagination | null;
};

const initialState: emailsState = {
  emails: null,
  emailPagination: null,
};

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

export const getEmails = createAsyncThunk<EmailListResponse, GetEmailsParams>(
  'emails/getEmails',
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const response = await emailService.getEmails(offset, limit);
      return response;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmails.fulfilled, (state, action) => {
      state.emails = action.payload.results;

      const pagination = {
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
      state.emailPagination = pagination;
    });
  },
});

export default emailSlice.reducer;
