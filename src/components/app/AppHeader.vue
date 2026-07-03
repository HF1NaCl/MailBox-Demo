<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { capacitorPlatform } from '@/composables/capacitor';
import { apps, helpCircleOutline, personCircle, settingsOutline } from 'ionicons/icons';
</script>

<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <template v-if="capacitorPlatform !== 'web'" slot="start">
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-searchbar></ion-searchbar>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </template>
      <template v-else>
        <ion-searchbar></ion-searchbar>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="helpCircleOutline"></ion-icon>
          </ion-button>
          <ion-button> Actualizar </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="apps"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </template>
    </ion-toolbar>
  </ion-header>
</template>

<style scoped>
ion-toolbar {
  --background: transparent;
  --border-color: transparent;
  --color: var(--app-on-surface);
  box-shadow: none;
}
ion-menu-button {
  --color: var(--app-on-surface);
}
ion-title {
  color: var(--app-on-surface);
  font-weight: 500;
}
</style>
