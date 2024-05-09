<script setup lang="ts">
import Timer from "./Timer.vue"

</script>

<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-end justify-content-between">
      <div class="d-flex align-items-end">
        <h1 class="me-3">*Nom*</h1>
        <h3 class="text-secondary">*Catégorie*</h3>
      </div>
      <h4>00:00</h4>
    </div>
    <p>*Question*</p>
    <div class="mt-auto d-flex flex-column">
      <button class="btn text-danger btn-outline-dark border-2 fw-bold ms-auto m-2">Supprimer</button>
      <Timer class="border-top border-3 mt-2"/>
    </div>
  </div>
</template>

<style scoped></style>