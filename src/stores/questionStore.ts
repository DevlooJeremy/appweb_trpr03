import { defineStore } from "pinia";
import { ref } from "vue";
import { questionService } from '../services/questionService'
import { useAuthStore } from "@/stores/authStore";


export const useQuestionStore = defineStore('useQuestionStoreId',() => {

    const questions = ref<any>();
    const authStore = useAuthStore()

    async function getQuestions() {
        let userId = parseInt(authStore.getUserId);
        questions.value = await questionService.getUserQuestions(userId);
    }

    async function getNextQuestionId() {
        const response = await questionService.getAllQuestions();
        return response.length + 1;
    }

    async function createQuestion(question: string, priority: number) {
        let userId = parseInt(authStore.getUserId);
        let nextQuestionId: number = await getNextQuestionId();
        const response = await questionService.postQuestion({id: nextQuestionId, userId: userId, question: question, priority: priority});
        getQuestions();
        return response.id;
    }

    async function deleteQuestion(id: number) {
        await questionService.deleteQuestion(id);
        getQuestions();
    }


    return {
        questions,
        getQuestions,
        createQuestion,
        deleteQuestion
    }
});