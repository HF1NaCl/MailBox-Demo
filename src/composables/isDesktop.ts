import { computed, ref } from 'vue';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ScreenCondition = '>' | '>=' | '<' | '<=' | '===' | '!==';

const screenOrder: ScreenSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const queries: Record<ScreenSize, string> = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px)',
};

const medias = Object.fromEntries(
  Object.entries(queries).map(([size, query]) => [size, window.matchMedia(query)]),
) as Record<ScreenSize, MediaQueryList>;

export const screenSize = ref<ScreenSize>(
  (Object.keys(medias) as ScreenSize[]).find((size) => medias[size].matches) ?? 'xs',
);

const updateScreenSize = () => {
  screenSize.value =
    (Object.keys(medias) as ScreenSize[]).find((size) => medias[size].matches) ?? 'xs';
};

Object.values(medias).forEach((media) => {
  media.addEventListener('change', updateScreenSize);
});

export const isXs = computed(() => screenSize.value === 'xs');
export const isSm = computed(() => screenSize.value === 'sm');
export const isMd = computed(() => screenSize.value === 'md');
export const isLg = computed(() => screenSize.value === 'lg');
export const isXl = computed(() => screenSize.value === 'xl');

export const isDesktop = computed(() => ['md', 'lg', 'xl'].includes(screenSize.value));

export const isScreen = (condition: ScreenCondition, size: ScreenSize) => {
  const current = screenOrder.indexOf(screenSize.value);
  const target = screenOrder.indexOf(size);

  if (condition === '>') return current > target;
  if (condition === '>=') return current >= target;
  if (condition === '<') return current < target;
  if (condition === '<=') return current <= target;
  if (condition === '!==') return current !== target;

  return current === target;
};

export const splitPaneWhen = '(min-width: 1024px)';
export const isSplitPaneVisible = computed(() => ['lg', 'xl'].includes(screenSize.value));
