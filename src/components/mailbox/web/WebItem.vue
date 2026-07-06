<script setup lang="ts">
import type { Mail } from '@/types/Mail';
import { IonIcon } from '@ionic/vue';
import { bookmarkOutline, checkboxOutline, squareOutline, star, starOutline } from 'ionicons/icons';

defineProps<{
  mail: Mail;
  selected: boolean;
  unread?: boolean;
}>();

const emit = defineEmits<{
  openMail: [mailId: string];
  toggleFavorite: [mailId: string];
  toggleSelection: [mailId: string];
}>();
</script>

<template>
  <div class="mail-web-row" @click="emit('openMail', mail.id)">
    <ion-icon
      :icon="selected ? checkboxOutline : squareOutline"
      class="mail-icon"
      :class="{ selected }"
      @click.stop="emit('toggleSelection', mail.id)"
    />

    <ion-icon
      :icon="mail.isFavorite ? star : starOutline"
      class="mail-icon"
      @click.stop="emit('toggleFavorite', mail.id)"
    />

    <ion-icon :icon="bookmarkOutline" class="mail-icon" />

    <span class="mail-sender" :class="{ unread }">
      {{ mail.sender.mail }}
    </span>

    <span class="mail-subject" :class="{ unread }">
      {{ mail.subject }}
    </span>

    <span class="mail-time" :class="{ unread }">
      {{
        new Date(mail.receivedAt).toLocaleTimeString('es-CL', {
          hour: '2-digit',
          minute: '2-digit',
        })
      }}
    </span>
  </div>
</template>

<style scoped>
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

.mail-icon.selected {
  color: var(--ion-color-primary);
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

.unread {
  font-weight: 700;
}
</style>
