<script setup lang="ts">
import { IonContent, IonIcon, IonItem, IonItemGroup, IonLabel, IonMenuToggle } from '@ionic/vue';
import { SidebarElements } from '@/config/sidebar';

defineProps<{
  selectedIndex: string;
}>();

defineEmits<{
  onSelectedIndex: [value: string];
}>();
</script>

<template>
  <ion-content class="sidebar-content sidebar-content--native">
    <hr class="sidebar-divider" />

    <ion-item-group
      v-for="(element, groupIndex) in SidebarElements"
      :key="groupIndex"
      class="sidebar-group sidebar-group--native"
    >
      <ion-label v-if="element.title" class="sidebar-section-title sidebar-section-title--native">
        {{ element.title }}
      </ion-label>

      <hr v-else-if="groupIndex !== 0" class="sidebar-divider" />

      <ion-menu-toggle
        v-for="(item, itemIndex) in element.items"
        :key="itemIndex"
        :auto-hide="false"
      >
        <ion-item
          button
          class="sidebar-item sidebar-item--native"
          @click="$emit('onSelectedIndex', `${groupIndex}-${itemIndex}`)"
          router-direction="root"
          lines="none"
          :detail="false"
          :class="{ selected: selectedIndex === `${groupIndex}-${itemIndex}` }"
        >
          <ion-icon :icon="item.icon" class="sidebar-item-icon" />
          <ion-label class="sidebar-item-label">
            {{ item.name }}
          </ion-label>
        </ion-item>
      </ion-menu-toggle>
    </ion-item-group>
  </ion-content>
</template>

<style scoped>
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
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.sidebar-item-icon {
  margin-right: 12px;
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
  margin: 8px 0 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--app-on-surface) 70%, transparent);
}
</style>
