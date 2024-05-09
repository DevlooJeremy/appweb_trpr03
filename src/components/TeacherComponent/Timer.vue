<script setup lang="ts"></script>

<template>
    <div class="d-flex flex-column">
        <h2 class="">Minuteur</h2>
        <form class="d-flex align-items-center">
            <input class="time-input" type="number" name="" id="" placeholder="00">
            :
            <input class="time-input" type="number" name="" id="" placeholder="00">
            <div class="ms-auto">
                <btn class="btn btn-outline-dark border-2 fw-bold m-2">Démarrer</btn>
                <btn class="btn btn-outline-dark border-2 fw-bold m-2">Arrêter</btn>
                <btn class="btn btn-outline-dark border-2 fw-bold m-2">Réinitialiser</btn>
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