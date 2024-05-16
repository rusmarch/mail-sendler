import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import Stack from "@mui/material/Stack";

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from '../store/store';
import { retrieveUser } from '../features/auth/auth-slice';

import { CreateUserForm } from "../components/create-user-form";
import { RetrieveUserForm } from "../components/retrieve-user-form";

export const HomePage = () => {

   const user = useAppSelector((state: RootState) => state.auth.user);
   const userData = localStorage.getItem('userData');
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [formDisplay, setFormDisplay] = useState<boolean>(true);

   useEffect(() => {
      if (userData && user) {
         navigate('/emails');
      } else if (userData && !user) {
         dispatch(retrieveUser());
      }
   }, [userData, dispatch, navigate, user])

   const showForm = (): void => {
      setFormDisplay(prev => !prev);
   }

   return (
      <Stack alignItems='center' >
         {formDisplay
            ? <RetrieveUserForm onToggleForm={() => showForm()} />
            : <CreateUserForm onToggleForm={() => showForm()} />
         }
      </Stack>
   );
}