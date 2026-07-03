<script setup lang="ts">
import { capacitorPlatform } from '@/composables/capacitor';
import { isDesktop } from '../composables/isDesktop';
</script>

<template>
  <h1>Hola Gente hermosa</h1>
  <h2>Estás usando: {{ capacitorPlatform }}</h2>
  <h3>¿Tu pantalla es tamaño MD? {{ isDesktop }}</h3>
</template>

<style scoped></style>
