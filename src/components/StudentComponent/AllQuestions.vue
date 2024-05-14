<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';

const questionStore = useQuestionStore();

const questions = computed(() => questionStore.questions);

onMounted(() => {
    questionStore.getQuestions();
})
</script>

<template>
    <div class="border border-2 border-dark">
        UwU
        <ul>
            <li v-for="question of questions">
                {{ question.question }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
div {
    height: 600px;
    width: 300px;
}
</style>