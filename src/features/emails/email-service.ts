import axios from 'axios';
import { $api } from '../../api/axios';
import { Email, EmailListResponse, SendEmailRequest } from '../../types/mails';

const sendEmail = async (request: SendEmailRequest) => {
   const response = await $api.post<Email>(`/emails/`, request);
   return response.data;
}

const getAllEmails = async () => {
   const response = await $api.get<EmailListResponse>(`/emails/`);
   return response.data;
}

const getEmail = async (emailId: number) => {
   const response = await $api.get<Email>(`/emails/${emailId}`);
   return response.data;
}

const deleteEmail = async (emailId: number) => {
   return await axios.get(`/emails/${emailId}`);
}
export const emailService = {
   sendEmail,
   getAllEmails,
   getEmail,
   deleteEmail,
}