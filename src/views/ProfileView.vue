<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { userService } from '@/services/userService';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

const profileStore = useProfileStore()
const authStore = useAuthStore();
const userStore = useUserStore();

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

const newPassword = defineModel<string>("newPassword");
const passwordConfirmation = defineModel<string>("passwordConfirmation");

const newPasswordOnError = ref<boolean>(false);
const passwordConfirmationOnError = ref<boolean>(false);
const passwordNotIdenticalError = ref<boolean>(false);
const passwordNotLongEnoughError = ref<boolean>(false);

const newPasswordErrorMessage = ref("");
const passwordConfirmationErrorMessage = ref("");


onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})

function ressetErrors() {
  newPasswordOnError.value = false;
  passwordConfirmationOnError.value = false;
  passwordNotIdenticalError.value = false;
  passwordNotLongEnoughError.value = false;
}

function isNewPasswordValid() {
  if (newPassword.value == undefined || newPassword.value.trim() == "") {
    newPasswordOnError.value = true;
    newPasswordErrorMessage.value = "Le mot de passe est obligatoire.";
    return false;
  }
  else if (newPassword.value.length < 4) {
    passwordNotLongEnoughError.value = true;
    newPasswordErrorMessage.value = "Le mot de passe doit faire au moins 4 charactères.";
    return false;
  }
  return true;
}

function isPasswordConfirmationValid() {
  if (passwordConfirmation.value == undefined || passwordConfirmation.value.trim() == "") {
    passwordConfirmationOnError.value = true;
    passwordConfirmationErrorMessage.value = "Le mot de passe doit être confirmé.";
    return false;
  }
  return true;
}

function onSubmit() {
  ressetErrors();
  if (!isNewPasswordValid()) return;
  if (!isPasswordConfirmationValid()) return;
  if (newPassword.value === passwordConfirmation.value) {
    let id = parseInt(authStore.getUserId);
    userStore.changePassword({id, password: newPassword.value});
  }
  else {
    passwordNotIdenticalError.value = true;
    passwordConfirmationErrorMessage.value = "Les deux mots de passe doivent être identiques.";
  }
}
</script>

<template>
  <div class="m-3">
    <h1>Profile</h1>
    <h4>Nom: {{ name }}</h4>
    <h4>Courriel: {{ email }}</h4>
  </div>

  <div>
    <form class="d-flex flex-column align-items-center m-3" @submit.prevent="onSubmit">
      <h2>Changer votre mot de passe</h2>
      <div class="w-75">
        <input class="w-100" v-model="newPassword" name="newPassword" type="password" placeholder="Nouveau mot de passe">
        <div class="p-1 my-2 bg-danger text-white" v-if="passwordNotLongEnoughError">{{ newPasswordErrorMessage }}</div>
        <div class="p-1 my-2 bg-danger text-white" v-if="newPasswordOnError">{{ newPasswordErrorMessage }}</div>
      </div>
      <div class="w-75 my-2">
        <input class="w-100" v-model="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="Confirmation du mot de passe">
        <div class="p-1 my-2 bg-danger text-white" v-if="passwordConfirmationOnError">{{ passwordConfirmationErrorMessage }}</div>
        <div class="p-1 my-2 bg-danger text-white" v-if="passwordNotIdenticalError">{{ passwordConfirmationErrorMessage }}</div>
      </div>
      <button name="submit" class="btn btn-primary">Changer</button>
    </form>
  </div>
</template>

<style scoped>
form {
  width: fit-content;
}
</style>