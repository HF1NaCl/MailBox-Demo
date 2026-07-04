<script setup lang="ts">
import { Mail } from '@/types/Mail';
import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRippleEffect,
  IonRow,
} from '@ionic/vue';
import { star, starOutline } from 'ionicons/icons';

defineProps<{
  mails: Mail[];
}>();

const emit = defineEmits<{
  openMail: [mailId: string];
  toggleFavorite: [mailId: string];
}>();
</script>

<template>
  <ion-list lines="inset" class="mailbox-list">
    <ion-list-header>
      <ion-label>Recibidos</ion-label>
    </ion-list-header>
    <ion-card>
      <template v-if="mails.length > 0">
        <template v-for="(mail, index) in mails" :key="index">
          <div class="mail-preview ion-activatable" @click="emit('openMail', mail.id)">
            <ion-grid>
              <ion-row class="mail-row">
                <ion-col size="auto" class="mail-avatar-col">
                  <ion-avatar>
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
            <ion-ripple-effect />
          </div>
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
.mail-preview {
  position: relative;
  overflow: hidden;
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
.mailbox-list {
  --background: transparent;
  background: transparent;
}

.unread {
  font-weight: 700;
}
</style>
