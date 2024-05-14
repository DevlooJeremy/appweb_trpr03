import { parseAxiosError } from "@/shared/parseAxiosError"
import axiosAuth from '../shared/axiosAuth'


const URL = "http://127.0.0.1:3000/questions";

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

async function postQuestion(data: {id: number, userId: number, question: string }) {
    await axiosAuth.post(URL, data);
}

export const questionService = {
    getUserQuestions,
    getAllQuestions,
    postQuestion
}