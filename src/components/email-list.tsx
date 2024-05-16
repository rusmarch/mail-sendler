import { useEffect } from 'react';

import { Stack } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from "../store/store";
import { getAllEmails } from '../features/emails/email-slice';

export const EmailList = () => {

   const emails = useAppSelector((state: RootState) => state.emails.allEmails);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getAllEmails());
   }, [dispatch])

   return (
      <Stack>
         {emails && emails.map((item) =>
            <div key={item.id}>{item.subject}</div>
         )}
      </Stack>
   )
}