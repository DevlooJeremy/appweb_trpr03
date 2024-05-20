<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
    message: String
})

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'close'): void
}>()

const isRed = ref<boolean>(false)

onMounted(() => {
    setInterval(() => {isRed.value = !isRed.value}, 750)
})

function confirm() {
    emit("confirm")
}

function close() {
    emit("close")
}

</script>

<template>
    <div class="d-flex flex-column align-items-center bg-white border border-dark border-2 rounded p-2 popupSize">
        <h1 class="fw-bold text-center" :class="{'text-danger' : isRed}">Attention!</h1>
        <div class="mx-2" name="message">{{ props.message }}</div>
        <div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="confirm" name="confirmButton">Confirmer</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close" name="cancelButton">Annuler</div>
        </div>
    </div>
</template>

<style scoped>
.popupSize {
    max-width: 400px;
}
</style>