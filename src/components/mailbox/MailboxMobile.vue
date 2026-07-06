<script setup lang="ts">
import type { Mail } from '@/types/Mail';
import {
  IonCard,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  type RefresherCustomEvent,
} from '@ionic/vue';
import { checkboxOutline, squareOutline } from 'ionicons/icons';
import MobileItem from './mobile/MobileItem.vue';

const props = defineProps<{
  mails: Mail[];
  selectedMailIds: Set<string>;
  selectedCount: number;
  hasSelectedMails: boolean;
  allMailsSelected: boolean;
}>();

const emit = defineEmits<{
  openMail: [mailId: string];
  toggleFavorite: [mailId: string];
  toggleSelection: [mailId: string];
  toggleAllSelection: [];
  resetMails: [];
}>();

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    emit('resetMails');
    event.target.complete();
  }, 500);
};
const isSelected = (mailId: string) => props.selectedMailIds.has(mailId);
</script>

<template>
  <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <ion-list lines="inset" class="mailbox-list">
    <ion-list-header>
      <ion-label class="mailbox-header-label">
        <ion-icon
          v-if="hasSelectedMails"
          :icon="allMailsSelected ? checkboxOutline : squareOutline"
          class="select-all-icon"
          @click.stop="emit('toggleAllSelection')"
        />

        <span>
          {{ hasSelectedMails ? 'Seleccionar todos' : 'Recibidos' }}
        </span>
      </ion-label>
    </ion-list-header>
    <ion-card>
      <template v-if="mails.length > 0">
        <template v-for="(mail, index) in mails" :key="mail.id">
          <MobileItem
            :mail="mail"
            :selected="isSelected(mail.id)"
            @open-mail="emit('openMail', $event)"
            @toggle-favorite="emit('toggleFavorite', $event)"
            @toggle-selection="emit('toggleSelection', $event)"
          />

          <hr v-if="index < mails.length - 1" class="mail-separator" />
        </template>
      </template>
      <div v-else class="empty-mails">
        <h1>No hay correos.</h1>
      </div>
    </ion-card>
  </ion-list>
</template>

<style scoped>
.empty-mails {
  padding: 24px 16px;
  text-align: center;
  color: var(--ion-color-medium);
}
.icon-favorite {
  font-size: 28px;
}
ion-card {
  border-radius: 20px;
  overflow: hidden;
}
.ion-margin-top {
  margin-top: 8px;
}
.ion-padding {
  padding: 8px;
}
.mail-actions-col {
  flex: 0 0 56px;
  width: 56px;
  text-align: right;
}
.mail-avatar-col {
  flex: 0 0 auto;
}
.mail-header {
  padding: 8px 0;
}
.mail-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: var(--ion-card-background, var(--ion-background-color));
  --background-activated: currentColor;
  --background-activated-opacity: 0.08;
  --background-focused: currentColor;
  --background-focused-opacity: 0.08;
  --ripple-color: currentColor;
}
.mail-item.selected {
  --background: var(--app-secondary-container);
  --color: var(--app-on-secondary-container);
}

.mail-item.selected .mail-preview {
  background: var(--app-secondary-container);
}

.mail-item.selected .mail-text,
.mail-item.selected .mail-time,
.mail-item.selected .icon-favorite {
  color: var(--app-on-secondary-container);
}

.mail-preview {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--ion-card-background, var(--ion-background-color));
}
.mail-row {
  align-items: center;
  flex-wrap: nowrap;
}
.mail-separator {
  width: 100%;
  margin: 0;
  border: 0;
  border-top: 1px solid var(--app-outline-variant);
}
.mail-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mail-time {
  margin: 0 0 4px;
  font-size: 14px;
}
.mail-text-col {
  min-width: 0;
}
.mailbox-header-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.mailbox-list {
  --background: transparent;
  background: transparent;
}
.select-all-icon {
  font-size: 22px;
}
.unread {
  font-weight: 700;
}
</style>
