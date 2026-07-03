<template>
  <ion-page>
    <AppHeader />
    <ion-content>
      <div id="container" class="ion-padding">
        <MailboxMobile v-if="capacitorPlatform === 'web'" />
        <template v-else>
          <h1>Web</h1>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { capacitorPlatform } from '@/composables/capacitor';
import MailboxMobile from '@/components/mailbox/MailboxMobile.vue';
</script>

<style scoped></style>
