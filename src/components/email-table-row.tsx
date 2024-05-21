import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Email } from '../types/mails';

type Props = {
   email: Email;
}

export const EmailTableRow = ({ email }: Props) => {

   const [open, setOpen] = useState(false);

   return (
      <>
         <TableRow >
            <TableCell>{email.id}</TableCell>
            <TableCell>{email.recipient}</TableCell>
            <TableCell>{email.subject}</TableCell>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 5 }}>
                     <Typography variant="subtitle2" gutterBottom component="div">
                        {email.message}
                     </Typography>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </>
   );
}