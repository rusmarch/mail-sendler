import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'; 
import authSlice from 'src/features/auth/auth-slice';
import emailSlice from 'src/features/emails/email-slice';

export const store = configureStore({
   reducer: {
      auth: authSlice,
      emails: emailSlice,
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState, 
unknown,
Action<string>
>;