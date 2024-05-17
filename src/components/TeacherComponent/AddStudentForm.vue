<script setup lang="ts">
import { useUserStore } from "../../stores/userStore";

const emit = defineEmits<{
  (event: 'close'): void
}>()

const userStore = useUserStore()

const completeName: any = defineModel("completeName");
const password: any = defineModel("password");
const email: any = defineModel("email");

function addUser() {
    userStore.addStudent(completeName.value, password.value, email.value)
    close()
}

function close() {
    emit("close")
}

</script>

<template>
    <form class="d-flex flex-column bg-white border border-primary border-2 rounded p-2" action="">
        <h1 class="text-center">Ajouter un élève</h1>
        <input class="m-1" type="text" v-model="completeName" placeholder="Nom complet">
        <input class="m-1" type="text" v-model="password" placeholder="Mot de passe">
        <input class="m-1" type="email" v-model="email" placeholder="Adresse courriel">
        <div class="ms-auto">
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="addUser">Ajouter</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close">Annuler</div>
        </div>
    </form>
</template>

<style scoped>
</style>