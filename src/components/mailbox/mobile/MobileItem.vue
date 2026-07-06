<script setup lang="ts">
import type { Mail } from '@/types/Mail';
import {
  IonAvatar,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonRow,
} from '@ionic/vue';
import { archiveOutline, star, starOutline } from 'ionicons/icons';

const props = defineProps<{
  mail: Mail;
  selected: boolean;
}>();

const emit = defineEmits<{
  openMail: [mailId: string];
  toggleFavorite: [mailId: string];
  toggleSelection: [mailId: string];
}>();

let longPressTimer: ReturnType<typeof setTimeout> | null = null;
let didLongPress = false;

const startLongPress = () => {
  didLongPress = false;

  longPressTimer = setTimeout(() => {
    didLongPress = true;
    emit('toggleSelection', props.mail.id);
  }, 500);
};

const cancelLongPress = () => {
  if (!longPressTimer) return;

  clearTimeout(longPressTimer);
  longPressTimer = null;
};

const openMail = () => {
  if (didLongPress) return;

  emit('openMail', props.mail.id);
};

const toggleSelectionFromAvatar = () => {
  if (didLongPress) return;

  emit('toggleSelection', props.mail.id);
};
</script>

<template>
  <ion-item-sliding>
    <ion-item
      button
      lines="none"
      class="mail-item"
      :class="{ selected }"
      @click="openMail"
      @pointerdown="startLongPress"
      @pointerup="cancelLongPress"
      @pointerleave="cancelLongPress"
      @pointercancel="cancelLongPress"
    >
      <div class="mail-preview">
        <ion-grid>
          <ion-row class="mail-row">
            <ion-col size="auto" class="mail-avatar-col">
              <ion-avatar
                class="mail-avatar"
                :class="{ selected }"
                @click.stop="toggleSelectionFromAvatar"
              >
                <img :alt="mail.sender.mail" :src="mail.sender.avatar" />
              </ion-avatar>
            </ion-col>

            <ion-col class="mail-text-col">
              <ion-card-header class="mail-header">
                <ion-card-title class="mail-text" :class="{ unread: !mail.isRead }">
                  {{ mail.sender.mail }}
                </ion-card-title>

                <ion-card-subtitle class="mail-text" :class="{ unread: !mail.isRead }">
                  {{ mail.subject }}
                </ion-card-subtitle>
              </ion-card-header>
            </ion-col>

            <ion-col size="auto" class="mail-actions-col">
              <h5 class="mail-time" :class="{ unread: !mail.isRead }">
                {{
                  new Date(mail.receivedAt).toLocaleTimeString('es-CL', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </h5>

              <ion-icon
                :icon="mail.isFavorite ? star : starOutline"
                class="icon-favorite"
                @click.stop="emit('toggleFavorite', mail.id)"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-item>

    <ion-item-options side="end">
      <ion-item-option color="success">
        <ion-icon slot="icon-only" :icon="archiveOutline" />
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>
.icon-favorite {
  font-size: 28px;
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

.unread {
  font-weight: 700;
}
</style>
