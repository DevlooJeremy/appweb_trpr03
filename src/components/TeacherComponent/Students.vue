<script setup lang="ts">
import { watch, ref } from 'vue';


const props = defineProps({
    students: Array<any>
});

const studentList = ref()

/*watch(props, () => {props.students?.then((response) => {
    console.log(response)
    studentList.value = response
})})*/

const emit = defineEmits<{
  (event: 'openStudentForm'): void,
  (event: 'removeStudent', id: number): void
}>()

function addStudent() {
    emit("openStudentForm")
}

function removeStudent(studentId:number) {
    emit("removeStudent", studentId)
}

function isStudent(role:string) {
    return role == "student"
}

</script>

<template>
    <div class="d-flex flex-column align-items-center p-3">
        <h1 class="title">Étudiants</h1>
        <div class="addingButton" @click="addStudent">Ajouter +</div>
        <div class="w-100" v-for="student of props.students">
            <div class="row py-2 border-bottom border-dark mx-3" v-if="isStudent(student.role)">
                <div class="col text-center">{{student.name}}</div>
                <div class="col text-center text-danger" @click="removeStudent(student.id)">Supprimer</div>
            </div>
        </div>
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