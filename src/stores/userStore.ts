import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { userService } from '../services/userService'
import { parseAxiosError } from '@/shared/parseAxiosError';

export const useUserStore = defineStore('useUserStore', () => {

    //const students = computed(async () => {console.log("test");let test = await getStudentUsers(); return test})
    const students = reactive({data: getStudentUsers()})


    async function getStudentUsers() {
        try {
            return await userService.getUsers();
        } catch (error) {
            console.log(error)
        }
    }

    async function addStudent(name: string, password: string, email: string) {
        try {
            const id = ref<number>(0)
            await students.data.then((response) => {id.value = response.lenght + 1})
            userService.postUser({email: email, password: password, name: name, id: id.value, role: "student"});
        } catch (error) {
            console.log("erreur")
        }
    }

    async function removeStudent(id:number) {
        try {
            await userService.deleteUser(id);
        } catch (error) {
            console.log("erreur")
        }
    }

    async function getStudents() {
        return await students.data;
    }

    async function changePassword(user: {id: number, password: string}) {
        try {
            userService.changePassword(user);
        } catch (error) {
            throw parseAxiosError(error);
        }
    }

    return {
        getStudents,
        addStudent,
        removeStudent,
        changePassword,
        students
    }

});