<script setup lang="ts">
import type { Mail } from '@/types/Mail';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import {
  alertCircleOutline,
  archiveOutline,
  caretDown,
  checkboxOutline,
  ellipsisVertical,
  folderOutline,
  mailOpenOutline,
  reloadOutline,
  squareOutline,
  trashOutline,
} from 'ionicons/icons';
import WebItem from './web/WebItem.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  mails: Mail[];
  selectedMailIds: Set<string>;
  selectedCount: number;
  hasSelectedMails: boolean;
}>();

const unreadMails = computed(() => props.mails.filter((mail) => !mail.isRead));
const readMails = computed(() => props.mails.filter((mail) => mail.isRead));

const isSelected = (mailId: string) => props.selectedMailIds.has(mailId);

const emit = defineEmits<{
  openMail: [mailId: string];
  toggleFavorite: [mailId: string];
  toggleSelection: [mailId: string];
  toggleAllSelection: [];
  resetMails: [];
}>();

const openAccordions = ref<string[]>(['unread', 'read']);
</script>

<template>
  <ion-card>
    <div class="mail-toolbar">
      <ion-button fill="clear" shape="round" class="select-button">
        <span class="select-button-action" @click.stop="emit('toggleAllSelection')">
          <ion-icon :icon="hasSelectedMails ? checkboxOutline : squareOutline" class="mail-icon" />
        </span>

        <span class="select-button-action">
          <ion-icon :icon="caretDown" />
        </span>
      </ion-button>
      <ion-button v-if="selectedCount === 0" fill="clear" shape="round" @click="emit('resetMails')">
        <ion-icon slot="icon-only" :icon="reloadOutline" class="mail-icon" />
      </ion-button>
      <template v-else>
        <ion-button fill="clear" shape="round">
          <ion-icon slot="icon-only" :icon="archiveOutline" class="mail-icon" />
        </ion-button>
        <ion-button fill="clear" shape="round">
          <ion-icon slot="icon-only" :icon="alertCircleOutline" class="mail-icon" />
        </ion-button>
        <ion-button fill="clear" shape="round">
          <ion-icon slot="icon-only" :icon="trashOutline" class="mail-icon" />
        </ion-button>
        <span class="toolbar-separator" />
        <ion-button fill="clear" shape="round">
          <ion-icon slot="icon-only" :icon="mailOpenOutline" class="mail-icon" />
        </ion-button>
        <ion-button fill="clear" shape="round">
          <ion-icon slot="icon-only" :icon="folderOutline" class="mail-icon" />
        </ion-button>
      </template>
      <ion-button fill="clear" shape="round"
        ><ion-icon slot="icon-only" :icon="ellipsisVertical" class="mail-icon" />
      </ion-button>
    </div>
    <ion-accordion-group
      :multiple="true"
      :value="openAccordions"
      @ionChange="openAccordions = $event.detail.value"
    >
      <ion-accordion value="unread">
        <ion-item slot="header">
          <ion-label>No leídos</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <template v-if="unreadMails.length > 0">
            <WebItem
              v-for="mail in unreadMails"
              :key="mail.id"
              :mail="mail"
              :selected="isSelected(mail.id)"
              unread
              @open-mail="emit('openMail', $event)"
              @toggle-selection="emit('toggleSelection', $event)"
              @toggle-favorite="emit('toggleFavorite', $event)"
            />
          </template>
          <div v-else class="empty-mails">No hay correos.</div>
        </div>
      </ion-accordion>
      <ion-accordion value="read">
        <ion-item slot="header">
          <ion-label>Todo lo demás</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
          <template v-if="readMails.length > 0">
            <WebItem
              v-for="mail in readMails"
              :key="mail.id"
              :mail="mail"
              :selected="isSelected(mail.id)"
              @open-mail="emit('openMail', $event)"
              @toggle-selection="emit('toggleSelection', $event)"
              @toggle-favorite="emit('toggleFavorite', $event)"
            />
          </template>
          <div v-else class="empty-mails">No hay correos.</div>
        </div>
      </ion-accordion>
    </ion-accordion-group>
  </ion-card>
</template>

<style scoped>
.empty-mails {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ion-color-medium);
  font-size: 14px;
}
.ion-padding {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 16px;
  padding-right: 16px;
}
.mail-web-row {
  display: grid;
  grid-template-columns: 32px 32px 32px minmax(160px, 220px) minmax(0, 1fr) 96px;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  user-select: none;
  -webkit-user-select: none;
}

.mail-icon {
  width: 20px;
  height: 20px;
}

.mail-sender,
.mail-subject {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mail-time {
  text-align: right;
  white-space: nowrap;
}
.mail-toolbar {
  display: flex;
  align-items: center;
}

.select-button {
  --padding-start: 0;
  --padding-end: 0;
}

.select-button::part(native) {
  gap: 0;
}

.select-button-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
}
.toolbar-separator {
  width: 1px;
  height: 24px;
  margin: 0 6px;
  background: var(--app-outline-variant);
}
.unread {
  font-weight: 700;
}
</style>
