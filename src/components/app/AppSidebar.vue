<script setup lang="ts">
import { IonHeader, IonMenu, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue';
import { ref } from 'vue';
import { capacitorPlatform } from '@/composables/capacitor';
import { isSplitPaneVisible } from '@/composables/isDesktop';
import SidebarMobile from './sidebar/SidebarMobile.vue';
import SidebarWeb from './sidebar/SidebarWeb.vue';

const selectedIndex = ref('0-0');
const selectedWebIndex = ref(0);
const isWebCollapsed = ref(false);

const toggleWebSidebar = (event: Event) => {
  if (capacitorPlatform !== 'web' || !isSplitPaneVisible.value) return;

  event.preventDefault();
  event.stopPropagation();
  isWebCollapsed.value = !isWebCollapsed.value;
};
</script>

<template>
  <ion-menu
    content-id="main-content"
    :class="{
      'sidebar--collapsed': capacitorPlatform === 'web' && isSplitPaneVisible && isWebCollapsed,
    }"
  >
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" v-if="capacitorPlatform === 'web'">
          <ion-menu-button :auto-hide="false" @click.capture="toggleWebSidebar" />
        </ion-buttons>
        <ion-title>MailBox Demo</ion-title>
      </ion-toolbar>
    </ion-header>
    <SidebarMobile
      v-if="capacitorPlatform !== 'web'"
      :selected-index="selectedIndex"
      @on-selected-index="selectedIndex = $event"
    />
    <SidebarWeb
      v-else
      :selected-index="selectedWebIndex"
      :collapsed="isWebCollapsed"
      @on-selected-index="selectedWebIndex = $event"
    />
  </ion-menu>
</template>

<style scoped>
ion-menu {
  --app-sidebar-width: 304px;
  --background: var(--app-surface-container);
  --width: var(--app-sidebar-width);
  --min-width: var(--app-sidebar-width);
  --max-width: var(--app-sidebar-width);
  --side-width: var(--app-sidebar-width);
  --side-min-width: var(--app-sidebar-width);
  --side-max-width: var(--app-sidebar-width);
  color: var(--app-on-surface);

  transition:
    width 180ms ease,
    min-width 180ms ease,
    max-width 180ms ease;
}

ion-menu.sidebar--collapsed {
  --app-sidebar-width: 72px;
}
ion-toolbar {
  --background: var(--app-surface-container);
  --border-color: transparent;
  --color: var(--app-on-surface);
  box-shadow: none;
}
ion-label {
  --background: transparent;
  --border-color: transparent;
  box-shadow: none;
}

ion-menu.sidebar--collapsed {
  --app-sidebar-width: 72px;
}

.sidebar-content {
  --background: var(--app-surface-container);
  --color: var(--app-on-surface);
}

.sidebar-item {
  --background: transparent;
  --color: var(--app-on-surface);
  --border-radius: 24px;
  --border-width: 0;
  --inner-border-width: 0;
  margin: 2px 8px;
  min-height: 48px;

  transition:
    background-color 0.2s,
    color 0.2s;
}

.sidebar-item,
.sidebar-item-label {
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.sidebar-item:hover {
  --background: color-mix(in srgb, var(--app-on-surface) 8%, transparent);
}

.sidebar-item.selected {
  --background: var(--app-secondary-container);
  --color: var(--app-on-secondary-container);
  color: var(--app-on-secondary-container);
  font-weight: 500;
}

.sidebar-section-title {
  padding: 12px 16px;
  margin: 8px 0 4px 0;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--app-on-surface) 70%, transparent);
}

.sidebar-divider {
  border: none;
  background-color: var(--app-outline-variant);
  height: 1px;
  margin: 15px 0;
}
</style>
