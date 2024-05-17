<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
    message: String,
    role: String
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

const isRed = ref<boolean>(false)

onMounted(() => {
    setInterval(() => {isRed.value = !isRed.value}, 750)
})

function close() {
    emit("close")
}

</script>

<template>
    <div class="d-flex flex-column align-items-center bg-warning border border-dark border-2 rounded p-2 popupSize">
        <h1 class="fw-bold text-center">ALERT</h1>
        <div class="mx-2">{{ props.message }}</div>
        <div v-if="props.role === 'teacher'" class="btn btn-outline-dark border-2 fw-bold m-2 bg-white text-danger" @click="close">Fermer</div>
    </div>
</template>

<style scoped>
.popupSize {
    max-width: 400px;
}
</style>