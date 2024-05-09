import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './authStore'
import { handService } from '../services/handService'

export const useHandStore = defineStore('useHandStoreId', () => {

    const onError = ref(false);
    const nextHandId = ref<number>(0);

    async function raiseHand(priority: number, userId: number, questionId: number) {
        try {
            onError.value = false;
            handService.postHand({id: nextHandId.value, priority: priority, userId: userId, questionId: questionId});
        } catch (error) {
            onError.value = true;
            console.log("erreur")
        }
        if (!onError) nextHandId.value += 1;
    }

    return {
        onError,
        raiseHand
    }

});