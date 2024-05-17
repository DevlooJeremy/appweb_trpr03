<script setup lang="ts">
import { useUserStore } from "../../stores/userStore";

const props = defineProps({
    message: String
})

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'close'): void
}>()

function confirm() {
    emit("confirm")
}

function close() {
    emit("close")
}

</script>

<template>
    <div class="d-flex flex-column align-items-center bg-white border border-dark border-2 rounded p-2 popupSize">
        <h1 class="text-danger fw-bold text-center">Attention!</h1>
        <div class="mx-2">{{ props.message }}</div>
        <div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="confirm">Confirmer</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close">Annuler</div>
        </div>
    </div>
</template>

<style scoped>
.popupSize {
    max-width: 250px;
}
</style>