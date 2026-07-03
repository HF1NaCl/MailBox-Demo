<script setup lang="ts">
import AppSidebar from '@/components/app/AppSidebar.vue';
import { splitPaneWhen } from '@/composables/isDesktop';
import { IonRouterOutlet, IonSplitPane } from '@ionic/vue';
</script>

<template>
  <ion-split-pane :when="splitPaneWhen" content-id="main-content">
    <AppSidebar />
    <ion-router-outlet id="main-content" />
  </ion-split-pane>
</template>
