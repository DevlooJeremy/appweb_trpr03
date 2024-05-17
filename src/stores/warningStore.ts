import { defineStore } from 'pinia'
import { ref} from 'vue'
import { warningService } from '../services/warningService'

export const useWarningStore = defineStore('useWarningStore', () => {

    const warning = ref<any>()

    async function getWarning() {
        try {
            warning.value = await warningService.getWarning().then((response) => {return response[0]})
        } catch (error) {
            console.log(error)
        }
    }

    async function changeWarningMessage(newMessage: string) {
        try {
            await warningService.updateWarningMessage(newMessage)
        } catch (error) {
            console.log(error)
        }
    }

    async function changeWarningState(isActive: boolean) {
        try {
            await warningService.updateWarningState(isActive)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getWarning,
        changeWarningMessage,
        changeWarningState,
        warning
    }

});