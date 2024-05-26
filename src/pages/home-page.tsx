import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import { useAppSelector, useAppDispatch } from 'src/hooks/redux-hooks';
import { RootState } from 'src/store/store';
import { retrieveUser } from 'src/features/auth/auth-slice';

import { CreateUserForm } from 'src/components/create-user-form';
import { RetrieveUserForm } from 'src/components/retrieve-user-form';
import { useBoolean } from 'src/hooks/use-boolean';

export const HomePage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const userData = localStorage.getItem('userData');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRetrieveFormDisplay = useBoolean(true);

  useEffect(() => {
    if (userData && user) {
      navigate('/emails');
    } else if (userData && !user) {
      dispatch(retrieveUser());
    }
  }, [userData, dispatch, navigate, user]);

  return (
    <Stack alignItems="center">
      {isRetrieveFormDisplay.value ? (
        <RetrieveUserForm onToggleForm={isRetrieveFormDisplay.onToggle} />
      ) : (
        <CreateUserForm onToggleForm={isRetrieveFormDisplay.onToggle} />
      )}
    </Stack>
  );
};
