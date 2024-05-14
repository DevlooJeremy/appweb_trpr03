import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { questionService } from '../services/questionService'
import { useAuthStore } from "@/stores/authStore";


export const useQuestionStore = defineStore('useQuestionStoreId',() => {

    const questions = ref<any>();
    const authStore = useAuthStore()
    const nextQuestionId = computed<number>(() => {
        return questionService.getAllQuestions.length;
    })

    async function getQuestions() {
        let userId = parseInt(authStore.getUserId);
        questions.value = await questionService.getUserQuestions(userId);
    }

    async function createQuestion(question: string) {
        let userId = parseInt(authStore.getUserId);
        questionService.postQuestion({id: nextQuestionId.value, userId: userId, question: question});
    }


    return {
        questions,
        getQuestions,
        createQuestion
    }
});