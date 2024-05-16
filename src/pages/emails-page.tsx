import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import Stack from "@mui/material/Stack";

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from '../store/store';
import { retrieveUser } from '../features/auth/auth-slice';
import { Header } from "../components/header";

export const EmailsPage = () => {

   const user = useAppSelector((state: RootState) => state.auth.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const userData = localStorage.getItem('userData');

   useEffect(() => {
      if (!user) {
         navigate('/');
      }
   }, [dispatch, userData, navigate, user])

   return (
      <>
         <Header />
         <Stack>
            Stack
         </Stack >
      </>
   );
}