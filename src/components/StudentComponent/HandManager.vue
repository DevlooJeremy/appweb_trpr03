<script setup lang="ts">
import {ref} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useHandStore } from '@/stores/handStore';

const authStore = useAuthStore();
const handStore = useHandStore();
function onSubmit() {
    let userId = parseInt(authStore.getUserId);
    handStore.raiseHand(1,1,1);
}
</script>

<template>
    <main class="d-flex justify-content-around">
        <button class="btn btn-primary">Super</button>
        <form @submit.prevent="onSubmit">
            <button class="btn btn-primary me-2">Lever</button>
            <select name="priority" id="priority">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </form>
        <button class="btn btn-primary">Baisser</button>
        
    </main>
</template>

<style>
</style>