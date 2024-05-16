<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';

const questionStore = useQuestionStore();

const questions = computed(() => questionStore.questions);

onMounted(() => {
    questionStore.getQuestions();
})

//modifier l'affichage de cette vue.
</script>

<template>
    <div class="border border-2 border-dark">
        <ul>
            <li class="list-group-item border-bottom border-dark border-1" v-for="(question, index) of questions">
                {{ index }}
                {{ question.question }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
div {
    height: 600px;
    width: 500px;
}
</style>