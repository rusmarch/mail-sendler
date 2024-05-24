import { $api } from 'src/api/axios';
import { Email, EmailListResponse, SendEmailRequest } from 'src/types/mails';

const sendEmail = async (request: SendEmailRequest) => {
  const response = await $api.post<Email>(`/emails/`, request);
  return response.data;
};

const getEmails = async (offset: number, limit: number) => {
  const response = await $api.get<EmailListResponse>(`/emails/?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const emailService = {
  sendEmail,
  getEmails,
};
