import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { handService } from '../services/handService'

export const useHandStore = defineStore('useHandStoreId', () => {

    const onError = ref(false);
    const nextHandId = computed<number>(() => {
        return handService.getHands.length
    });
    const hands = computed(() => {
        return handService.getHands;
    });

    async function raiseHand(priority: number, userId: number, questionId: number) {
        try {
            onError.value = false;
            handService.postHand({id: nextHandId.value, priority: priority, userId: userId, questionId: questionId});
        } catch (error) {
            onError.value = true;
        }
    }


    return {
        onError,
        raiseHand
    }

});