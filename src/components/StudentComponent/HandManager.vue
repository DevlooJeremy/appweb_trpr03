<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useHandStore } from '@/stores/handStore'
import { useQuestionStore } from '@/stores/questionStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const handStore = useHandStore();
const questionStore = useQuestionStore();

const question = defineModel<string>("question");

const priority = defineModel<string>("priority");
priority.value = "1";

async function onSubmit() {
    if (question.value == undefined || priority.value == undefined) return;
    let questionId: number = await questionStore.createQuestion(question.value);
    handStore.raiseHand(parseInt(priority.value),questionId);
}
</script>

<template>
    <main class="d-flex justify-content-around">
        <button class="btn btn-primary">Super</button>
        <form @submit.prevent="onSubmit">
            <textarea v-model="question" placeholder="edit me"></textarea>
            <button class="btn btn-primary me-2">Lever</button>
            <select v-model="priority">
                <option selected value="1">1</option>
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