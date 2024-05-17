<script setup lang="ts">

const props = defineProps({
    popupWindowOpen: Boolean
})

const minutes: any = defineModel("minutes");
const seconds: any = defineModel("seconds");

const emit = defineEmits<{
    (event: 'startTimer'): void,
    (event: 'setTime', newTime:number): void,
    (event: 'stopTimer'): void,
    (event: 'reinitialiseTimer'): void
}>()

function startTimer() {
    if (minutes.value > 0 && seconds.value > 0) {
        emit("setTime", timeToNumber())
    }
    emit("startTimer")
}

function stopTimer() {
    emit("stopTimer")
}

function reinitialiseTimer() {
    emit("reinitialiseTimer")
}

function timeToNumber(): number {
    return (minutes*60) + seconds
}

</script>

<template>
    <div class="d-flex flex-column">
        <h2 class="">Minuteur</h2>
        <form class="d-flex align-items-center">
            <input class="time-input" type="number" v-model="minutes" placeholder="00">
            :
            <input class="time-input" type="number" v-model="seconds" placeholder="00">
            <div class="ms-auto">
                <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="startTimer">Démarrer</div>
                <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="stopTimer">Arrêter</div>
                <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="reinitialiseTimer">Réinitialiser</div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.time-input {
    width: 42px;
    margin: 0 4px;
}
</style>