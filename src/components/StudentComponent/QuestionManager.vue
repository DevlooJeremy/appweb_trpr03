<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useQuestionStore } from '@/stores/questionStore';
import { onMounted } from 'vue'

const authStore = useAuthStore();
const questionStore = useQuestionStore();

const isSuper = defineModel<boolean>("isSuper");
isSuper.value = false;
const question = defineModel<string>("question");
const priority = defineModel<string>("priority");

onMounted(() => {
    isSuper.value = false;
    priority.value = "1";
})

async function onSubmit() {
    if (question.value == undefined || priority.value == undefined || isSuper.value == undefined) return;
    let questionId: number = await questionStore.createQuestion(question.value, parseInt(priority.value), isSuper.value);
}
</script>

<template>
    <main class="d-flex justify-content-around border border-dark border-2">
        <form @submit.prevent="onSubmit">
            <input class="form-control" type="text" placeholder="Sujet">
            <textarea class="form-control" name="question" v-model="question" placeholder="Question" cols="50" rows="5"></textarea>
            <button class="btn btn-primary me-2">Lever</button>
            <select v-model="priority">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <select name="category" id="category">
                <option>catégorie</option>
            </select>
            <label for="private">Privée</label>
            <input type="checkbox" name="private" id="private">
            <label for="super">super</label>
            <input v-model="isSuper" type="checkbox" name="super" id="super">
        </form>
        
    </main>
</template>

<style scoped>
main {
    height: 600px;
    width: 700px;
}
</style>