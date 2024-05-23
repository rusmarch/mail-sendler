import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

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

import { useAppDispatch } from 'src/hooks/redux-hooks';
import { createUser } from 'src/features/auth/auth-slice';
import { CreateUserData } from 'src/types/auth';

type Props = {
   onToggleForm: VoidFunction;
};

export const CreateUserForm = ({ onToggleForm }: Props) => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState<boolean>(false);

   const createUserSchema = Yup.object().shape({
      username: Yup.string()
         .required('Username is required')
         .matches(/^[\w.@+-]+$/, 'Invalid username format')
         .max(150, 'Username must be at most 150 characters')
         .min(1, 'Username must be at least 1 character'),
      email: Yup.string()
         .required('Email is required')
         .email('Invalid email address')
         .max(254, 'Email must be at most 254 characters'),
      password: Yup.string()
         .required('Password is required')
         .max(128, 'Password must be at most 128 characters')
         .min(1, 'Password must be at least 1 character'),
   });

   const defaultValues = {
      username: '',
      email: '',
      password: '',
   };

   const methods = useForm<CreateUserData>({
      resolver: yupResolver(createUserSchema),
      defaultValues,
   });

   const onSubmit = methods.handleSubmit((formData: CreateUserData) => {
      dispatch(createUser(formData))
         .unwrap()
         .then(() => {
            navigate('/emails');
         })
      methods.reset();
   });

   return (
      <>
         <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: 1, backgroundColor: 'primary.main' }}
         >
            <Card sx={{
               p: 5, width: 1,
               maxWidth: 420,
               border: 1,
               borderColor: '#1976d2'
            }}>

               <Typography variant="h4" textAlign="center">Sign Up</Typography>
               <Typography variant="body2" textAlign="center" sx={{ my: 2 }}>
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
                     <TextField
                        {...methods.register('username')}
                        label="Username"
                        error={!!methods.formState.errors.username}
                        helperText={methods.formState.errors.username?.message}
                     />
                     <TextField
                        {...methods.register('email')}
                        label="Email address"
                        error={!!methods.formState.errors.email}
                        helperText={methods.formState.errors.email?.message}
                     />

                     <TextField
                        {...methods.register('password')}
                        label="Password"
                        error={!!methods.formState.errors.password}
                        helperText={methods.formState.errors.password?.message}
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
