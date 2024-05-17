import { useEffect, useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from "../store/store";
import { getEmails } from '../features/emails/email-slice';
import { TablePagination } from '@mui/material';

export const EmailList = () => {

   const emails = useAppSelector((state: RootState) => state.emails.emails);
   const pagination = useAppSelector((state: RootState) => state.emails.emailPagination);
   const dispatch = useAppDispatch();
   const [offset, setOffset] = useState<number>(0)

   const currentPage = useMemo(() => {
      if (!pagination || !pagination.next) return 0;
      const urlParams = new URLSearchParams(pagination.next);
      const limit = urlParams.get('limit');
      const offset = urlParams.get('offset');
      return Math.floor(parseInt(offset || '0', 10) / parseInt(limit || '1', 10));
   }, [pagination]);

   const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number) => {
      if (event) {
         const newOffset = newPage * 5;
         setOffset(newOffset);
      }
   }

   useEffect(() => {
      dispatch(getEmails({ offset, limit: 5 }));
   }, [dispatch, offset])

   return (
      <Card sx={{ p: 2, border: 1, borderColor: '#1976d2' }}>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell align='left'>
                        <Typography variant='subtitle1'>ID</Typography>
                     </TableCell>
                     <TableCell align="left">
                        <Typography variant='subtitle1'>Recepient</Typography>
                     </TableCell>
                     <TableCell align="left">
                        <Typography variant='subtitle1'>Subject</Typography>
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {emails && emails.map((email) =>
                     <TableRow key={email.id}>
                        <TableCell>{email.id}</TableCell>
                        <TableCell>{email.recipient}</TableCell>
                        <TableCell>{email.subject}</TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            component="div"
            rowsPerPage={5}
            count={pagination?.count || 0}
            page={currentPage}
            onPageChange={handleChangePage}
         />
      </Card>
   );
}