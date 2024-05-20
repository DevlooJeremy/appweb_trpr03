<script setup lang="ts">

const props = defineProps({
    popupWindowOpen: Boolean
})

const emit = defineEmits<{
  (event: 'sendWarning', message: string): void
}>()

const message: any = defineModel("message");

function sendWarning() {
  if (!props.popupWindowOpen) {
    emit('sendWarning', message.value)
  }
}

</script>

<template>
    <form class="d-flex flex-column">
        <h1>Lancer une alerte</h1>
        <input class="flex-fill message" type="text" v-model="message" placeholder="Entrée un message" name="alertMessage">
        <div class="btn btn-outline-dark border-2 fw-bold ms-auto m-2" @click="sendWarning" name="sendAlertButton">Envoyer</div>
    </form>
</template>

<style scoped>
.message {
  height: 70px;
}
</style>