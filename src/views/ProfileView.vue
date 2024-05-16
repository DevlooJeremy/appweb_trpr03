<script setup lang="ts">
import { onMounted, computed } from 'vue'
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
const passwordConfirmation = defineModel("passwordConfirmation");

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

function onSubmit() {
  if (newPassword.value === undefined || passwordConfirmation === undefined) return;
  if (newPassword.value === passwordConfirmation.value) {
    let id = parseInt(authStore.getUserId);
    console.log("allo")
    userStore.changePassword({id, password: newPassword.value});
  }
  else {
    //implémenter erreur
    console.log("erreur")
  }
}
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>
  </div>

  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="newPassword" type="password" placeholder="nouveau mot de passe">
      <input v-model="passwordConfirmation" type="password" placeholder="confirmation du mot de passe">
      <button class="btn btn-primary">changer</button>
    </form>
  </div>
</template>

<style scoped></style>