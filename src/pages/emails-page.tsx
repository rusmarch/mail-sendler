import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import Stack from "@mui/material/Stack";

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from '../store/store';
import { Header } from "../components/header";
import { EmailList } from "../components/email-list-table";
import { SendEmailForm } from "../components/send-email-form";

export const EmailsPage = () => {

   const user = useAppSelector((state: RootState) => state.auth.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         navigate('/');
      }
   }, [dispatch, navigate, user])

   return (
      <>
         <Header />
         <Stack spacing={5} sx={{ my: 10 }}>
            <SendEmailForm />
            <EmailList />
         </Stack >
      </>
   );
}