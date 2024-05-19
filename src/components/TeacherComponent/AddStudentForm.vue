<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
    (event: 'addStudent', name:string, password:string, email:string): void,
    (event: 'close'): void
}>()

const completeName: any = defineModel("completeName");
const password: any = defineModel("password");
const email: any = defineModel("email");

const hasError = ref<boolean>(false)
const nameErrorShown = ref<boolean>(false)
const nameErrorMessage = ref<string>("")
const passwordErrorShown = ref<boolean>(false)
const passwordErrorMessage = ref<string>("")
const emailErrorShown = ref<boolean>(false)
const emailErrorMessage = ref<string>("")
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

function addUser() {
    hasError.value = false
    validateName()
    validatePassword()
    validateEmail()
    if (!hasError.value) {
        emit('addStudent', completeName.value, password.value, email.value)
        close()
    }
}

function close() {
    emit("close")
}

function validateName(){
    if ((completeName.value??"").trim() == "") {
        hasError.value = true
        nameErrorShown.value = true
        nameErrorMessage.value = "Le nom est requis et ne peut pas être vide."
    }
    else {
        nameErrorShown.value = false
    }
}

function validatePassword(){
    if ((password.value??"").trim() == "") {
        hasError.value = true
        passwordErrorShown.value = true
        passwordErrorMessage.value = "Le mot de passe est requis et ne peut pas être vide."
    }
    else if(password.value.length < 4) {
        hasError.value = true
        passwordErrorShown.value = true
        passwordErrorMessage.value = "Le mot de passe doit faire 4+ charactères de long."
    }
    else {
        passwordErrorShown.value = false
    }
}

function validateEmail(){
    if ((email.value??"").trim() == "") {
        hasError.value = true
        emailErrorShown.value = true
        emailErrorMessage.value = "L\'adresse courriel est requis et ne peut pas être vide."
    }
    else if(!email.value.match(EMAIL_REGEX)) {
        hasError.value = true
        emailErrorShown.value = true
        emailErrorMessage.value = "L\'adresse courriel doit avoir un format valide."
    }
    else {
        emailErrorShown.value = false
    }
}

</script>

<template>
    <form class="d-flex flex-column bg-white border border-primary border-2 rounded p-2" action="">
        <h1 class="text-center">Ajouter un élève</h1>
        <input class="m-1" type="text" v-model="completeName" placeholder="Nom complet" name="name">
        <div v-if="nameErrorShown" class="mx-1 px-1 bg-danger text-white text-center rounded" name="nameError">{{ nameErrorMessage }}</div>
        <input class="m-1" type="text" v-model="password" placeholder="Mot de passe" name="password">
        <div v-if="passwordErrorShown" class="mx-1 px-1 bg-danger text-white text-center rounded" name="passwordError">{{ passwordErrorMessage }}</div>
        <input class="m-1" type="email" v-model="email" placeholder="Adresse courriel" name="email">
        <div v-if="emailErrorShown" class="mx-1 px-1 bg-danger text-white text-center rounded" name="emailError">{{ emailErrorMessage }}</div>
        <div class="ms-auto">
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="addUser" name="addButton">Ajouter</div>
            <div class="btn btn-outline-dark border-2 fw-bold m-2" @click="close" name="cancelButton">Annuler</div>
        </div>
    </form>
</template>

<style scoped>
</style>