import { computed, ref } from 'vue';
import type { Mail } from '@/types/Mail';

export function useMails() {
  const mails = ref<Mail[]>([]);
  const selectedMailIds = ref<Set<string>>(new Set());

  const selectedMails = computed(() =>
    mails.value.filter((mail) => selectedMailIds.value.has(mail.id)),
  );

  const selectedCount = computed(() => selectedMailIds.value.size);
  const hasSelectedMails = computed(() => selectedCount.value > 0);

  const allMailsSelected = computed(() => {
    return mails.value.length > 0 && selectedMailIds.value.size === mails.value.length;
  });

  const cloneMails = (mails: Mail[]) => {
    return mails.map((mail) => ({
      ...mail,
      sender: { ...mail.sender },
      receivedAt: new Date(mail.receivedAt),
    }));
  };

  const loadMails = async () => {
    const { mockMails } = await import('@/mocks/mails');
    mails.value = cloneMails(mockMails);
  };

  const resetMails = async () => {
    clearSelectedMails();
    await loadMails();
  };

  const toggleMailSelection = (mailId: string) => {
    const nextSelectedIds = new Set(selectedMailIds.value);

    if (nextSelectedIds.has(mailId)) {
      nextSelectedIds.delete(mailId);
    } else {
      nextSelectedIds.add(mailId);
    }

    selectedMailIds.value = nextSelectedIds;
  };

  const isMailSelected = (mailId: string) => {
    return selectedMailIds.value.has(mailId);
  };

  const selectAllMails = () => {
    selectedMailIds.value = new Set(mails.value.map((mail) => mail.id));
  };

  const clearSelectedMails = () => {
    selectedMailIds.value = new Set();
  };

  const toggleAllMailsSelection = () => {
    if (selectedMailIds.value.size === mails.value.length) {
      clearSelectedMails();
      return;
    }

    selectAllMails();
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
    selectedMailIds,
    selectedMails,
    selectedCount,
    hasSelectedMails,
    allMailsSelected,
    loadMails,
    resetMails,
    toggleMailSelection,
    selectAllMails,
    clearSelectedMails,
    toggleAllMailsSelection,
    isMailSelected,
    toggleFavorite,
    markAsRead,
    toggleRead,
  };
}
