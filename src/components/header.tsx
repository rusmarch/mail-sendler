import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from "../store/store";
import { logout } from "../features/auth/auth-slice";

export const Header = () => {

   const user = useAppSelector((state: RootState) => state.auth.user)
   const dispatch = useAppDispatch();

   const onLogout = (): void => {
      localStorage.removeItem('userData');
      dispatch(logout());
   }

   return (
      <AppBar>
         <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, backgroundColor: 'primary.main' }}
         >
            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
            >
               {user && (
                  <>
                     <Avatar alt={user.username} />
                     <Stack >
                        <Typography variant="subtitle1" noWrap>
                           {user.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                           {user.email}
                        </Typography>
                     </Stack>
                  </>
               )}
            </Stack>
            <Stack direction="row" alignContent="center" alignItems="center">
               <Button
                  variant="contained"
                  color="secondary"
                  onClick={onLogout}
               >
                  <LogoutOutlinedIcon />
                  <Typography variant="subtitle2" color="#fff">Logout</Typography>
               </Button>
            </Stack>
         </Stack>
      </AppBar>
   );
}