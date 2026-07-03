import { SidebarElement } from '@/types/Sidebar';
import {
  fileTrayStacked,
  fileTray,
  mailOpenOutline,
  bookmarkOutline,
  settingsOutline,
  helpCircleOutline,
} from 'ionicons/icons';

export const SidebarElements: SidebarElement[] = [
  {
    items: [
      {
        name: 'Todos los Recibidos',
        icon: fileTrayStacked,
      },
    ],
  },
  {
    items: [
      {
        name: 'Recibidos',
        icon: fileTray,
      },
      {
        name: 'No leídos',
        icon: mailOpenOutline,
      },
    ],
  },
  {
    title: 'Etiquetas recientes',
    items: [
      {
        name: 'Notion',
        icon: bookmarkOutline,
      },
    ],
  },
  {
    items: [
      {
        name: 'Configuración',
        icon: settingsOutline,
      },
      {
        name: 'Ayuda y comentarios',
        icon: helpCircleOutline,
      },
    ],
  },
];
