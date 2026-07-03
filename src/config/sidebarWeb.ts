import { SidebarItem } from '@/types/Sidebar';
import {
  alertOutline,
  archiveOutline,
  bagHandleOutline,
  bookmarkOutline,
  documentOutline,
  fileTray,
  hourglassOutline,
  sendOutline,
  starOutline,
  timeOutline,
} from 'ionicons/icons';

export const sidebarElementsWeb: SidebarItem[] = [
  {
    name: 'Recibidos',
    icon: fileTray,
  },
  {
    name: 'Destacados',
    icon: starOutline,
  },
  {
    name: 'Pospuestos',
    icon: timeOutline,
  },
  {
    name: 'Enviados',
    icon: sendOutline,
  },
  {
    name: 'Compras',
    icon: bagHandleOutline,
  },
  {
    name: 'Importantes',
    icon: bookmarkOutline,
  },
  {
    name: 'Programados',
    icon: hourglassOutline,
  },
  {
    name: 'Borradores',
    icon: documentOutline,
  },
  {
    name: 'Todos',
    icon: archiveOutline,
  },
  {
    name: 'Spam',
    icon: alertOutline,
  },
];
