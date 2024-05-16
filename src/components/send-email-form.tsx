import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { RootState } from '../store/store';
import { SendEmailRequest } from '../types/mails';
import { sendEmail } from '../features/emails/email-slice';

export const SendEmailForm = () => {

   const user = useAppSelector((state: RootState) => state.auth.user)
   const dispatch = useAppDispatch();

   const emailSchema = Yup.object().shape({
      sender: Yup.number().required('Sender is required'),
      recipient: Yup.string()
         .email('Invalid email address')
         .required('Recipient is required')
         .max(254, 'Recipient must be at most 254 characters')
         .min(1, 'Recipient must be at least 1 character'),
      subject: Yup.string()
         .required('Subject is required')
         .max(255, 'Subject must be at most 255 characters')
         .min(1, 'Subject must be at least 1 character'),
      message: Yup.string()
         .required('Message is required')
         .max(5000, 'Message must be at most 5000 characters')
         .min(1, 'Message must be at least 1 character'),
   });

   const defaultValues = {
      sender: user?.id,
      recipient: user?.email,
      subject: '',
      message: '',
   };

   const methods = useForm<SendEmailRequest>({
      resolver: yupResolver(emailSchema),
      defaultValues,
   });

   const onSubmit = methods.handleSubmit((
      formData: SendEmailRequest
   ) => {
      dispatch(sendEmail(formData))
      methods.reset();
   });

   return (
      <>
         <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: 1, backgroundColor: 'primary.main' }}
         >
            <Card sx={{ p: 4, width: '100vh', border: 1, borderColor: '#1976d2' }} >

               <form onSubmit={onSubmit}>
                  <Stack spacing={3}>
                     <TextField
                        fullWidth
                        {...methods.register('sender')}
                        label="Sender"
                        error={!!methods.formState.errors.sender}
                        helperText={methods.formState.errors.sender?.message}
                        size='small'
                     />

                     <TextField
                        fullWidth
                        {...methods.register('recipient')}
                        label="Email"
                        error={!!methods.formState.errors.recipient}
                        helperText={methods.formState.errors.recipient?.message}
                        size='small'
                     />

                     <TextField
                        fullWidth
                        {...methods.register('subject')}
                        label="Subject"
                        error={!!methods.formState.errors.subject}
                        helperText={methods.formState.errors.subject?.message}
                        size='small'
                     />
                     <TextField
                        fullWidth
                        {...methods.register('message')}
                        label="Message"
                        placeholder='Type your message...'
                        error={!!methods.formState.errors.message}
                        helperText={methods.formState.errors.message?.message}
                        size='small'
                        multiline
                        rows={4}
                     />
                  </Stack>

                  <Divider sx={{ my: 1 }} />

                  <LoadingButton
                     fullWidth
                     size="medium"
                     type="submit"
                     variant="contained"
                     color="primary"
                  >
                     Send Mail
                  </LoadingButton>

               </form>
            </Card>
         </Stack>
      </>
   );
}
