<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';

const questionStore = useQuestionStore();

const questions = computed(() => questionStore.questions);

onMounted(() => {
    questionStore.getQuestions();
})

function deleteQuestion(id: number) {
    questionStore.deleteQuestion(id);
}

//modifier l'affichage de cette vue.
</script>

<template>
    <div class="border border-2 border-dark">
        <ul class="">
            <li class="border-bottom border-dark border-1 mt-3" v-for="(question, index) of questions">
                {{ index + 1}}
                {{ question.question }}
                <button @click="deleteQuestion(question.id)" class="btn btn-primary">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
div {
    height: 600px;
    width: 500px;
}
ul {
    list-style: none;
    padding: 0;
}
</style>