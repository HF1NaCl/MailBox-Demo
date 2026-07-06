<script setup lang="ts">
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { capacitorPlatform } from '@/composables/capacitor';
import MailboxMobile from '@/components/mailbox/MailboxMobile.vue';
import { onMounted } from 'vue';
import { pencil } from 'ionicons/icons';
import { useMails } from '@/composables/useMails';
import MailboxWeb from '@/components/mailbox/MailboxWeb.vue';

const {
  mails,
  selectedMailIds,
  selectedCount,
  allMailsSelected,
  hasSelectedMails,
  loadMails,
  resetMails,
  toggleMailSelection,
  toggleAllMailsSelection,
  toggleFavorite,
  markAsRead,
} = useMails();

onMounted(async () => {
  loadMails();
});
</script>

<template>
  <ion-page>
    <AppHeader />
    <ion-content>
      <div id="container">
        <MailboxMobile
          v-if="capacitorPlatform !== 'web'"
          :mails="mails"
          :selected-mail-ids="selectedMailIds"
          :selected-count="selectedCount"
          :has-selected-mails="hasSelectedMails"
          :all-mails-selected="allMailsSelected"
          @toggle-selection="toggleMailSelection"
          @toggle-all-selection="toggleAllMailsSelection"
          @toggle-favorite="toggleFavorite"
          @open-mail="markAsRead"
          @reset-mails="resetMails"
        />
        <MailboxWeb
          v-else
          :mails="mails"
          :selected-mail-ids="selectedMailIds"
          :selected-count="selectedCount"
          :has-selected-mails="hasSelectedMails"
          @reset-mails="resetMails"
          @toggle-selection="toggleMailSelection"
          @toggle-all-selection="toggleAllMailsSelection"
          @toggle-favorite="toggleFavorite"
          @open-mail="markAsRead"
        />
      </div>
      <ion-fab
        v-if="capacitorPlatform !== 'web'"
        :mails="mails"
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        class="ion-padding"
        color="secondary"
      >
        <ion-fab-button>
          <ion-icon :icon="pencil" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
</style>
