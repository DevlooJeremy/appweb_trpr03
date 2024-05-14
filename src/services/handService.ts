import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function postHand(hand: {id: number, priority: number, userId: number, questionId: number}) {
    try {
        
        await axiosAuth.post(`http://127.0.0.1:3000/hands`,hand);
        
    } catch (error) {
        throw parseAxiosError(error);
    }
}

async function getHands() {
    try {  

        const response = await axiosAuth.get(`http://127.0.0.1:3000/hands`);
        return response.data;
        
    } catch (error) {
        throw parseAxiosError(error);
    }
}

export const handService = {
    postHand,
    getHands
}