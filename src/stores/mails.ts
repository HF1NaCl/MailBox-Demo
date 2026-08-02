// src/stores/mails.ts
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Mail } from '@/types/Mail';

export const useMailStore = defineStore('mails', () => {
  const mails = ref<Mail[]>([]);
  const selectedMailIds = ref(new Set<string>());

  const selectedCount = computed(() => selectedMailIds.value.size);
  const hasSelectedMails = computed(() => selectedCount.value > 0);
  const allMailsSelected = computed(
    () => mails.value.length > 0 && selectedMailIds.value.size === mails.value.length,
  );

  const loadMails = async () => {
    const { mockMails } = await import('@/mocks/mails');
    mails.value = structuredClone(mockMails);
  };

  const toggleMailSelection = (id: string) => {
    const selected = new Set(selectedMailIds.value);
    selected.has(id) ? selected.delete(id) : selected.add(id);
    selectedMailIds.value = selected;
  };

  const toggleAllMailsSelection = () => {
    selectedMailIds.value =
      selectedMailIds.value.size === mails.value.length
        ? new Set()
        : new Set(mails.value.map(({ id }) => id));
  };

  const toggleFavorite = (id: string) => {
    const mail = mails.value.find((mail) => mail.id === id);
    if (mail) mail.isFavorite = !mail.isFavorite;
  };

  const markAsRead = (id: string) => {
    const mail = mails.value.find((mail) => mail.id === id);
    if (mail) mail.isRead = true;
  };

  const resetMails = async () => {
    selectedMailIds.value = new Set();
    await loadMails();
  };

  return {
    mails,
    selectedMailIds,
    selectedCount,
    hasSelectedMails,
    allMailsSelected,
    loadMails,
    resetMails,
    toggleMailSelection,
    toggleAllMailsSelection,
    toggleFavorite,
    markAsRead,
  };
});
