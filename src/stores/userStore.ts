import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { userService } from '../services/userService'

export const useHandStore = defineStore('useHandStoreId', () => {

    const students = computed(() => { getStudentUsers()})

    async function getStudentUsers() {
        try {
            userService.getUsers();
        } catch (error) {
            console.log("erreur")
        }
    }

    async function addStudent(name: string, password: string, email: string) {
        try {
            handService.postHand({id: nextHandId.value, priority: priority, userId: userId, questionId: questionId});
        } catch (error) {
            console.log("erreur")
        }
    }

    return {
        students,
        raiseHand
    }

});