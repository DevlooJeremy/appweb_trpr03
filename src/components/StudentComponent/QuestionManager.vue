<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useQuestionStore } from '@/stores/questionStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const questionStore = useQuestionStore();

const question = defineModel<string>("question");

const priority = defineModel<string>("priority");
priority.value = "1";

async function onSubmit() {
    if (question.value == undefined || priority.value == undefined) return;
    let questionId: number = await questionStore.createQuestion(question.value, parseInt(priority.value));
}
</script>

<template>
    <main class="d-flex justify-content-around border border-dark border-2">
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
            <label for="super">super</label>
            <input type="checkbox" name="super" id="super">
        </form>
        
    </main>
</template>

<style scoped>
main {
    height: 600px;
    width: 700px;
}
</style>