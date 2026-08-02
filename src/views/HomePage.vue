<script setup lang="ts">
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { capacitorPlatform } from '@/composables/capacitor';
import MailboxMobile from '@/components/mailbox/MailboxMobile.vue';
import { onMounted } from 'vue';
import { pencil } from 'ionicons/icons';
import MailboxWeb from '@/components/mailbox/MailboxWeb.vue';
import { useMailStore } from '@/stores/mails';

const store = useMailStore();

onMounted(() => {
  void store.loadMails();
});
</script>

<template>
  <ion-page>
    <AppHeader />
    <ion-content>
      <div id="container">
        <MailboxMobile v-if="capacitorPlatform !== 'web'" />
        <MailboxWeb v-else />
      </div>
      <ion-fab
        v-if="capacitorPlatform !== 'web'"
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
