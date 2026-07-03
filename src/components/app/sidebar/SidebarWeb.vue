<script setup lang="ts">
import { ref } from 'vue';
import { sidebarElementsWeb } from '@/config/sidebarWeb';
import { chevronDown, chevronUp, pencil } from 'ionicons/icons';
import { IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel } from '@ionic/vue';

const isExpanded = ref(false);

defineProps<{
  selectedIndex: number;
  collapsed: boolean;
}>();

defineEmits<{
  onSelectedIndex: [value: number];
}>();
</script>

<template>
  <ion-content class="sidebar-content sidebar-content--web">
    <div class="compose-button-wrapper" :class="{ collapsed }">
      <ion-button v-if="!collapsed" shape="round" size="large">
        <ion-icon slot="start" :icon="pencil"></ion-icon>
        <span>Redactar</span>
      </ion-button>

      <ion-button v-else shape="round" size="large">
        <ion-icon slot="icon-only" :icon="pencil"></ion-icon>
      </ion-button>
    </div>
    <ion-list class="sidebar-web-list" lines="none">
      <ion-item
        v-for="(item, index) in sidebarElementsWeb.slice(0, 5)"
        :key="item.name"
        button
        lines="none"
        class="sidebar-web-item"
        :class="{ selected: selectedIndex === index }"
        @click="$emit('onSelectedIndex', index)"
      >
        <ion-icon :icon="item.icon" class="sidebar-item-icon" />
        <ion-label class="sidebar-web-label" :class="{ hidden: collapsed }">
          {{ item.name }}
        </ion-label>
      </ion-item>

      <ion-item
        v-if="sidebarElementsWeb.length > 5"
        button
        lines="none"
        class="sidebar-web-item"
        @click="isExpanded = !isExpanded"
      >
        <ion-icon :icon="isExpanded ? chevronUp : chevronDown" class="sidebar-item-icon" />
        <ion-label class="sidebar-web-label" :class="{ hidden: collapsed }">{{
          isExpanded ? 'Menos' : 'Más'
        }}</ion-label>
      </ion-item>

      <template v-if="isExpanded">
        <ion-item
          v-for="(item, index) in sidebarElementsWeb.slice(5)"
          :key="item.name"
          button
          lines="none"
          class="sidebar-web-item"
          :class="{ selected: selectedIndex === index + 5 }"
          @click="$emit('onSelectedIndex', index + 5)"
        >
          <ion-icon :icon="item.icon" class="sidebar-item-icon" />
          <ion-label class="sidebar-web-label" :class="{ hidden: collapsed }">
            {{ item.name }}
          </ion-label>
        </ion-item>
      </template>
    </ion-list>
  </ion-content>
</template>

<style scoped>
.compose-button-wrapper {
  padding: 12px;
  width: 174px;
  transition: width 180ms ease;
}

.compose-button-wrapper.collapsed {
  width: 72px;
}

.compose-button-wrapper ion-button {
  margin: 0;
}

.compose-button-wrapper.collapsed ion-button {
  width: 48px;
  height: 48px;
  --padding-start: 0;
  --padding-end: 0;
}
.sidebar-item-icon {
  min-width: 24px;
  margin-right: 12px;
  transition: margin-right 180ms ease;
}
.sidebar-content--web {
  --background: var(--app-surface-container);
}
.sidebar-content--web :deep(.button-native) {
  justify-content: center;
}
.sidebar-web-label {
  opacity: 1;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  transition:
    opacity 120ms ease,
    max-width 180ms ease;
}
.sidebar-web-label.hidden {
  opacity: 0;
  max-width: 0;
}
.sidebar-web-list {
  background: transparent;
  --background: transparent;
  padding: 0;
}

.sidebar-web-item {
  --background: transparent;
  --color: var(--app-on-surface);
  --border-width: 0;
  --inner-border-width: 0;
  --border-radius: 0 24px 24px 0;
  margin-right: 8px;
  min-height: 48px;
  overflow: hidden;
}

.sidebar-web-item.selected {
  --background: var(--app-secondary-container);
  --color: var(--app-on-secondary-container);
  color: var(--app-on-secondary-container);
  font-weight: 500;
}

.sidebar-web-item:hover {
  --background: color-mix(in srgb, var(--app-on-surface) 8%, transparent);
}
</style>
