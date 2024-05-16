<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from "../../stores/userStore";
import AddStudentForm from "./AddStudentForm.vue"

const userStore = useUserStore()

const students = computed(() => userStore.users)

const addingStudent = ref<boolean>(false)

function openStudentForm() {
    addingStudent.value = true
}

function closeStudentForm() {
    addingStudent.value = false
}

onMounted(() => {
    userStore.getUsers()
})

async function removeStudent(id:number) {
    await userStore.removeStudent(id)
}

function isStudent(role:string) {
    return role == "student"
}

</script>

<template>
    <div class="d-flex flex-column align-items-center p-3">
        <h1 class="title">Étudiants</h1>
        <div class="addingButton" @click="openStudentForm">Ajouter +</div>
        <div class="w-100" v-for="student of students">
            <div class="row py-2 border-bottom border-dark mx-3" v-if="isStudent(student.role)">
                <div class="col text-center">{{student.name}}</div>
                <div class="col text-center text-danger" @click="removeStudent(student.id)">Supprimer</div>
            </div>
        </div>
        <AddStudentForm v-if="addingStudent" class="position-absolute top-50 start-50 translate-middle" @close="closeStudentForm"/>
    </div>
</template>

<style scoped>
.title {
    text-decoration: underline;
    max-width: fit-content;
}
.addingButton {
    color: #00d;
    max-width: fit-content;
}
</style>