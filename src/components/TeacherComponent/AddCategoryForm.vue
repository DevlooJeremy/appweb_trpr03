<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (event: 'addCategory', name:string): void
  (event: 'close'): void
}>()

const name: any = defineModel("name");

const hasError = ref<boolean>(false)
const nameErrorShown = ref<boolean>(false)
const nameErrorMessage = ref<string>("")

function addCategory() {
    hasError.value = false
    validateName()
    if (!hasError.value) {
        emit('addCategory', name.value)
        close()
    }
}

function close() {
    emit("close")
}

function validateName(){
    if ((name.value??"").trim() == "") {
        hasError.value = true
        nameErrorShown.value = true
        nameErrorMessage.value = "Le nom est requis et ne peut pas être vide."
    }
    else {
        nameErrorShown.value = false
    }
}

</script>

<template>
    <form class="d-flex flex-column bg-white border border-primary border-2 rounded p-2" action="">
        <h1 class="text-center">Ajouter une catégorie</h1>
        <input class="m-1" type="text" v-model="name" placeholder="Nom de la catégorie" name="name">
        <div v-if="nameErrorShown" class="mx-1 bg-danger text-white text-center rounded" name="nameError">{{ nameErrorMessage }}</div>
        <div class="ms-auto">
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="addCategory" name="addButton">Ajouter</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close" name="cancelButton">Annuler</div>
        </div>
    </form>
</template>

<style scoped>
</style>