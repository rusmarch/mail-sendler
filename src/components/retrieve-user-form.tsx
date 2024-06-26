import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
import { useBoolean } from 'src/hooks/use-boolean';
import { retrieveUser } from 'src/features/auth/auth-slice';
import { RetrieveUserData } from 'src/types/auth';

type Props = {
  onToggleForm: () => void;
};

export const RetrieveUserForm = ({ onToggleForm }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showPassword = useBoolean(false);

  const retrieveUserSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .matches(/^[\w.@+-]+$/, 'Invalid username format')
      .max(150, 'Username must be at most 150 characters')
      .min(1, 'Username must be at least 1 character'),
    password: Yup.string()
      .required('Password is required')
      .max(128, 'Password must be at most 128 characters')
      .min(1, 'Password must be at least 1 character'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm<RetrieveUserData>({
    resolver: yupResolver(retrieveUserSchema),
    defaultValues,
  });

  const onSubmit = methods.handleSubmit((formData: RetrieveUserData) => {
    localStorage.setItem('userData', JSON.stringify(formData));
    dispatch(retrieveUser())
      .unwrap()
      .then(() => {
        navigate('/emails');
      });
    methods.reset();
  });

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, backgroundColor: 'primary.main' }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            border: 1,
            borderColor: '#1976d2',
          }}
        >
          <Typography variant="h4" textAlign="center">
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ my: 2 }} textAlign="center">
            Already have an account?
            <Link
              variant="subtitle2"
              underline="hover"
              sx={{ ml: 0.5, color: 'blue' }}
              onClick={() => onToggleForm()}
            >
              Sign Up
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
                {...methods.register('password')}
                label="Password"
                error={!!methods.formState.errors.password}
                helperText={methods.formState.errors.password?.message}
                type={showPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        {showPassword.value ? (
                          <VisibilityIcon color="disabled" />
                        ) : (
                          <VisibilityOffIcon color="disabled" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary">
              Login
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </>
  );
};
