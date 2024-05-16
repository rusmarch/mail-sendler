import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"; 
import authSlice from "../features/auth/auth-slice";
import emailSlice from "../features/emails/email-slice";

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