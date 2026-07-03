export interface Mail {
  id: string;
  title: string;
  subject: string;
  sender: MailSender;
  message: string;
  receivedAt: Date;
  isFavorite: boolean;
  isRead: boolean;
}

export interface MailSender {
  name: string;
  avatar: string;
  mail: string;
}
