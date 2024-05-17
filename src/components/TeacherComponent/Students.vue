<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from "../../stores/userStore";
import AddStudentForm from "./AddStudentForm.vue"
import MessagePopup from "./MessagePopup.vue";

const STUDENT_REMOVAL_MESSAGE: string = "Vous êtes sur le point de supprimer un étudiant ET toutes ces questions! Voulez-vous procéder? Étudiant: "

const props = defineProps({
    popupWindowOpen: Boolean
})

const emit = defineEmits<{
    (event: 'switchPopupState'): void
}>()

const userStore = useUserStore()

const students = computed(() => userStore.users)

const addingStudent = ref<boolean>(false)
const studentToRemove = ref<number>(0)
const popupOpened = ref<boolean>(false)
const popupMessage = ref<string>("Aucun message. Ceci est une erreur, veuillez appuyer sur «Annuler».")

onMounted(() => {
    userStore.getUsers()
})

function openStudentForm() {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        addingStudent.value = true
    }
}

function closeStudentForm() {
    emit('switchPopupState')
    addingStudent.value = false
}

function openPopupMessage(message:string) {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        popupMessage.value = message
        popupOpened.value = true
    }
}

async function removeStudent(id:number, name:string) {
    if (!props.popupWindowOpen) {
        studentToRemove.value = id
        openPopupMessage(STUDENT_REMOVAL_MESSAGE + name)
    }
}

async function confirmFromPopup() {
    await userStore.removeStudent(studentToRemove.value)
    closePopup()
}

function closePopup() {
    studentToRemove.value = 0
    emit('switchPopupState')
    popupOpened.value = false
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
                <div class="col text-center  p-0">{{student.name}}</div>
                <div class="col text-center text-danger  p-0" @click="removeStudent(student.id, student.name)">Supprimer</div>
            </div>
        </div>
        <AddStudentForm v-if="addingStudent" class="position-absolute top-50 start-50 translate-middle" @close="closeStudentForm"/>
        <MessagePopup v-if="popupOpened" class="position-absolute top-50 start-50 translate-middle" :message="popupMessage" @confirm="confirmFromPopup" @close="closePopup"/>
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