import axiosAuth from '../shared/axiosAuth'


const URL = "http://127.0.0.1:3000/questions";

async function getQuestionById(questionId:number) {
    const response = await axiosAuth.get(URL + "/" + questionId);
    return response.data;
}

async function getUserQuestions(userId: number) {
    const response = await axiosAuth.get(URL, {
        params: {
            userId: userId
        }
    });
    return response.data;
}

async function getAllQuestions() {
    const response = await axiosAuth.get(URL);
    return response.data;
}

async function postQuestion(data: {id: number, userId: number, question: string, priority: number, isSuper: boolean }) {
   const response = await axiosAuth.post(URL, data);
   return response.data;
}

async function deleteQuestion(id: number) {
    await axiosAuth.delete(URL + "/" + id);
}

export const questionService = {
    getQuestionById,
    getUserQuestions,
    getAllQuestions,
    postQuestion,
    deleteQuestion
}