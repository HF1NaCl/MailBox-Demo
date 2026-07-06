import type { Mail, MailSender } from '@/types/Mail';

const senders: MailSender[] = [
  {
    name: 'Ionic Team',
    mail: 'team@ionic.io',
    avatar: 'https://i.pravatar.cc/80?img=1',
  },
  {
    name: 'Vue Updates',
    mail: 'news@vuejs.org',
    avatar: 'https://i.pravatar.cc/80?img=2',
  },
  {
    name: 'Capacitor Bot',
    mail: 'bot@capacitorjs.com',
    avatar: 'https://i.pravatar.cc/80?img=3',
  },
  {
    name: 'Soporte App',
    mail: 'soporte@mailbox.dev',
    avatar: 'https://i.pravatar.cc/80?img=4',
  },
  {
    name: 'GitHub',
    mail: 'notifications@github.com',
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
];

const subjects = [
  'Actualizacion del proyecto',
  'Nueva tarea asignada',
  'Resumen semanal',
  'Confirmacion de reunion',
  'Revision pendiente',
];

export const mockMails: Mail[] = Array.from({ length: 50 }, (_, index) => {
  const sender = senders[index % senders.length];

  return {
    id: String(index + 1),
    title: `Correo ${index + 1}`,
    subject: subjects[index % subjects.length],
    sender,
    message: `Contenido de prueba para el correo ${index + 1}.`,
    receivedAt: new Date(Date.now() - index * 60 * 60 * 1000),
    isFavorite: index % 7 === 0,
    isRead: index % 3 !== 0,
  };
});
