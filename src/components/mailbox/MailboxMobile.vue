<script setup lang="ts">
import { pencil, starOutline } from 'ionicons/icons';
</script>

<template>
  <ion-list lines="inset" class="mailbox-list">
    <ion-list-header>
      <ion-label>Recibidos</ion-label>
    </ion-list-header>
    <ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="auto">
            <ion-avatar class="ion-margin-top">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </ion-avatar>
          </ion-col>
          <ion-col>
            <ion-card-header>
              <ion-card-title>Título del Correo</ion-card-title>
              <ion-card-subtitle>Asunto</ion-card-subtitle>
            </ion-card-header>
          </ion-col>
          <ion-col size="auto" class="ion-text-right">
            <h5>18:00</h5>
            <ion-icon :icon="starOutline" class="icon-favorite" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  </ion-list>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="ion-padding" color="secondary">
    <ion-fab-button>
      <ion-icon :icon="pencil" />
    </ion-fab-button>
  </ion-fab>
</template>

<style scoped>
ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
.ion-margin-top {
  margin-top: 8px;
}
.icon-favorite {
  font-size: 28px;
}
.mailbox-list {
  --background: transparent;
  background: transparent;
}
</style>
