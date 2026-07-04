import { ref } from 'vue';
import type { Mail } from '@/types/Mail';
import { useMocks } from '@/config/env';
import { capacitorPlatform } from './capacitor';

export function useMails() {
  const mails = ref<Mail[]>([]);

  const loadMails = async () => {
    if (!useMocks) return;

    if (capacitorPlatform !== 'web') {
      const { mockMails } = await import('@/mocks/mails');
      mails.value = mockMails;
      return;
    }

    const response = await fetch('/api/mails');
    mails.value = await response.json();
  };

  const toggleFavorite = (mailId: string) => {
    const mail = mails.value.find((mail) => mail.id === mailId);
    if (!mail) return;

    mail.isFavorite = !mail.isFavorite;
  };

  const markAsRead = (mailId: string) => {
    const mail = mails.value.find((mail) => mail.id === mailId);
    if (!mail) return;

    mail.isRead = true;
  };

  const toggleRead = (mailId: string) => {
    const mail = mails.value.find((mail) => mail.id === mailId);
    if (!mail) return;

    mail.isRead = !mail.isRead;
  };

  return {
    mails,
    loadMails,
    toggleFavorite,
    markAsRead,
    toggleRead,
  };
}
