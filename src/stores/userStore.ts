import { defineStore } from 'pinia'
import { ref} from 'vue'
import { userService } from '../services/userService'
import { parseAxiosError } from '@/shared/parseAxiosError';

export const useUserStore = defineStore('useUserStore', () => {

    const users = ref<any>()

    async function getUserById(userId:number) {
        try {
            return await userService.getUserById(userId)
        } catch (error) {
            console.log(error)
        }
    }

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
            console.log(error)
        }
    }

    async function removeStudent(id:number) {
        try {
            await userService.deleteUser(id)
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    async function changePassword(user: {id: number, password: string}) {
        try {
            userService.changePassword(user);
        } catch (error) {
            throw parseAxiosError(error);
        }
    }

    return {
        getUserById,
        getUsers,
        addStudent,
        removeStudent,
        changePassword,
        users
    }

});