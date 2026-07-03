<template>
  <ion-page>
    <AppHeader />
    <ion-content>
      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
            >UI Components</a
          >
        </p>
        <text-sample />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import TextSample from '@/components/TextSample.vue';
import { IonContent, IonPage } from '@ionic/vue';
import AppHeader from '@/components/app/AppHeader.vue';
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
