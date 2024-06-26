export type Email = {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  message: string;
};
export type SendEmailRequest = {
  sender: number;
  recipient: string;
  subject: string;
  message: string;
};

export type EmailPagination = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type EmailListResponse = EmailPagination & {
  results: Email[];
};
