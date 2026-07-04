import type { Mail } from '@/types/Mail';

const senders = [
  ['Ionic Team', 'team@ionic.io'],
  ['Vue Updates', 'news@vuejs.org'],
  ['Capacitor Bot', 'bot@capacitorjs.com'],
  ['Soporte App', 'soporte@mailbox.dev'],
  ['GitHub', 'notifications@github.com'],
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
    sender: {
      name: sender[0],
      avatar: `https://i.pravatar.cc/80?img=${(index % 50) + 1}`,
      mail: sender[1],
    },
    message: `Contenido de prueba para el correo ${index + 1}.`,
    receivedAt: new Date(Date.now() - index * 60 * 60 * 1000),
    isFavorite: index % 7 === 0,
    isRead: index % 3 !== 0,
  };
});
