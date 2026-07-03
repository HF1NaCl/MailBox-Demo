import { ref } from 'vue';
import { capacitorPlatform } from './capacitor';

const media = window.matchMedia('(min-width: 768px)');

export const isDesktop = ref(media.matches);

media.addEventListener('change', () => {
  isDesktop.value = media.matches;
});

export const splitPaneWhen =
  capacitorPlatform === 'android' || capacitorPlatform === 'ios' ? '(min-width: 1024px)' : true;
