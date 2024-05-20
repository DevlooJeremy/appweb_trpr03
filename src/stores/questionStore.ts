import { defineStore } from "pinia";
import { ref } from "vue";
import { questionService } from '../services/questionService'
import { useAuthStore } from "@/stores/authStore";


export const useQuestionStore = defineStore('useQuestionStoreId',() => {

    const questions = ref<any>();
    const userQuestions = ref<any>();
    const publicQuestions = ref<any>();
    const authStore = useAuthStore()

    async function getQuestionById(questionId:number) {
        const response = await questionService.getQuestionById(questionId);
        return response;
    }

    async function getQuestions() {
        let userId = parseInt(authStore.getUserId);
        userQuestions.value = await questionService.getUserQuestions(userId);
    }

    async function getAllQuestions() {
        questions.value = await questionService.getAllQuestions();
    }

    async function getAllPublicQuestions() {
        publicQuestions.value = await questionService.getPublicQuestions();
    }

    async function getNextQuestionId() {
        const response = await questionService.getAllQuestions();
        return response.length + 1;
    }

    async function createQuestion(question: string, categoryId: number, subject: string, priority: number, isSuper: boolean, isPrivate: boolean) {
        let userId = parseInt(authStore.getUserId);
        let nextQuestionId: number = await getNextQuestionId();
        const response = await questionService.postQuestion({id: nextQuestionId, userId: userId, question: question, categoryId: categoryId, subject: subject, priority: priority, isSuper: isSuper, isPrivate: isPrivate});
        getQuestions();
        getAllPublicQuestions();
        return response.id;
    }

    async function deleteQuestion(id: number) {
        await questionService.deleteQuestion(id);
        getQuestions();
        getAllQuestions();
        getAllPublicQuestions();
    }


    return {
        questions,
        userQuestions,
        publicQuestions,
        getQuestionById,
        getQuestions,
        getAllQuestions,
        createQuestion,
        deleteQuestion,
        getAllPublicQuestions
    }
});