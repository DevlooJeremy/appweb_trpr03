<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter()

const props = defineProps({
  isLoggedIn: Boolean
})

const emit = defineEmits<{
  (event: 'logout'): void
}>()

function onLogout() {
  emit('logout')
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
          v-if="props.isLoggedIn"
          :to="{ name: 'Class' }"
        >
          Classe
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <RouterLink 
            class="nav-link"
            v-if="props.isLoggedIn" 
            :class="{ active: $route.name == 'Profile' }" 
            :to="{ name: 'Profile'}" 
          >
            Profile
          </RouterLink>
          <a class="nav-link" @click="onLogout" v-if="props.isLoggedIn" href="#">
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
