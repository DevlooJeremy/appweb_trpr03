<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn)

function logout() {
  authStore.logout()
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Class' }"
          v-if="isLoggedIn"
          :to="{ name: 'Class' }"
        >
          Classe
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <RouterLink 
            class="nav-link"
            v-if="isLoggedIn" 
            :class="{ active: $route.name == 'Profile' }" 
            :to="{ name: 'Profile'}" 
          >
            Profile
          </RouterLink>
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#">
            Se déconnecter
          </a>
          <RouterLink
            v-else
            class="nav-link"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
