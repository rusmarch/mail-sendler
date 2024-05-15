import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { RootState } from '../store/store';
import { createUser } from '../features/auth/auth-slice';
import { CreateUserData } from '../types/auth';

type Props = {
   onToggleForm: VoidFunction;
};

export const CreateUserForm = ({ onToggleForm }: Props) => {

   const user = useAppSelector((state: RootState) => state.auth.user);
   const isAuth = useAppSelector((state: RootState) => state.auth.isAuth);
   const dispatch = useAppDispatch();

   const [formData, setFormData] = useState<CreateUserData>({
      username: '',
      email: '',
      password: '',
   });

   const [showPassword, setShowPassword] = useState<boolean>(false);

   useEffect(() => {
      if (isAuth || user) {
         // navigate('/tasks')
      }
   }, [isAuth, user, dispatch])


   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   }

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(createUser(formData));
      setFormData({
         username: '',
         email: '',
         password: '',
      })
   };

   return (
      <>
         <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: 1, backgroundColor: 'primary.main' }}
         >
            <Card sx={{ p: 5, width: 1, maxWidth: 420 }} >

               <Typography variant="h4">Sign Up</Typography>
               <Typography variant="body2" sx={{ my: 2 }}>
                  Already have an account?
                  <Link
                     variant="subtitle2"
                     underline="hover"
                     sx={{ ml: .5, color: 'blue' }}
                     onClick={() => onToggleForm()}
                  >
                     Sign In
                  </Link>
               </Typography>

               <Divider sx={{ my: 3 }} />

               <form onSubmit={onSubmit}>
                  <Stack spacing={3}>
                     <TextField name="username" label="Username" onChange={onChange} />
                     <TextField name="email" label="Email address" onChange={onChange} />

                     <TextField
                        name="password"
                        label="Password"
                        onChange={onChange}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">
                                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword
                                       ? <VisibilityIcon color='disabled' />
                                       : <VisibilityOffIcon color='disabled' />}
                                 </IconButton>
                              </InputAdornment>
                           ),
                        }}
                     />

                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <LoadingButton
                     fullWidth
                     size="large"
                     type="submit"
                     variant="contained"
                     color="primary"
                  >
                     Register
                  </LoadingButton>

               </form>
            </Card>
         </Stack>
      </>
   );
}
