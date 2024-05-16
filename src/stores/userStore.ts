import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { userService } from '../services/userService'

export const useUserStore = defineStore('useUserStore', () => {

    const users = ref<any>()

    async function getUsers() {
        try {
            users.value = await userService.getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    async function addStudent(name: string, password: string, email: string) {
        try {
            userService.postUser({email: email, password: password, name: name, role: "student"})
            getUsers()
        } catch (error) {
            console.log("erreur")
        }
    }

    async function removeStudent(id:number) {
        try {
            await userService.deleteUser(id)
            getUsers()
        } catch (error) {
            console.log("erreur")
        }
    }

    return {
        getUsers,
        addStudent,
        removeStudent,
        users
    }

});