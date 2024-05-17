<script setup lang="ts">
import { useCategoryStore } from "../../stores/categoryStore";

const emit = defineEmits<{
  (event: 'close'): void
}>()

const categoryStore = useCategoryStore()

const name: any = defineModel("name");

function addUser() {
    categoryStore.addCategory(name.value)
    close()
}

function close() {
    emit("close")
}

</script>

<template>
    <form class="d-flex flex-column bg-white border border-primary border-2 rounded p-2" action="">
        <h1 class="text-center">Ajouter une catégorie</h1>
        <input class="m-1" type="text" v-model="name" placeholder="Nom de la catégorie">
        <div class="ms-auto">
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="addUser">Ajouter</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close">Annuler</div>
        </div>
    </form>
</template>

<style scoped>
</style>