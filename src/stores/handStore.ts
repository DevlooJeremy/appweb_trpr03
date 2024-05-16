import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { handService } from '../services/handService'
import { useAuthStore } from './authStore';

export const useHandStore = defineStore('useHandStoreId', () => {

    const authStore = useAuthStore();
    const onError = ref(false);
    
    async function getNextHandId() {
        const response = await handService.getHands();
        return response.length + 1;
    }


    async function raiseHand(priority: number, questionId: number) {
        try {
            onError.value = false;
            let nextHandId: number = await getNextHandId();
            let userId: number = parseInt(authStore.getUserId);
            handService.postHand({id: nextHandId, priority: priority, userId: userId, questionId: questionId});
        } catch (error) {
            onError.value = true;
        }
    }


    return {
        onError,
        raiseHand
    }

});