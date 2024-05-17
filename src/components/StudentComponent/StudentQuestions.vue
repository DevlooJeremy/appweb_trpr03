<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';

const questionStore = useQuestionStore();


const questions = computed(() => questionStore.questions);

onMounted(() => {
    questionStore.getQuestions();
})

function deleteQuestion(id: number) {
    questionStore.deleteQuestion(id);
}

</script>

<template>
    <div class="border border-2 border-dark questions">
        <ul>
            <li class="border-bottom border-dark border-1 mt-2 d-flex justify-content-between" v-for="(question, index) of questions">
                <div class="d-flex">
                    {{ index + 1}}
                    <div class="ms-2  text-break">
                        {{ question.question }}
                    </div>
                </div>
                <div @click="deleteQuestion(question.id)" class="text-danger me-2">Supprimer</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.questions {
    height: 600px;
    width: 500px;
}

.taille {
    max-width: 100px;
}

li {
    padding: 0;
}

ul {
    list-style: none;
    padding: 0;
}
</style>