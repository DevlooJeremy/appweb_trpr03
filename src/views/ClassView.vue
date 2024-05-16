<script setup lang="ts">
import Students from "../components/TeacherComponent/Students.vue";
import Questions from "../components/TeacherComponent/Questions.vue";
import DetailedQuestion from "../components/TeacherComponent/DetailedQuestion.vue";
import Alert from "../components/TeacherComponent/Alert.vue";
import AddStudentForm from "../components/TeacherComponent/AddStudentForm.vue";
import QuestionManager from "@/components/StudentComponent/QuestionManager.vue";
import AllQuestions from "@/components/StudentComponent/AllQuestions.vue";
import { useUserStore } from "../stores/userStore";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useProfileStore } from "@/stores/profileStore";

const userStore = useUserStore()
const profileStore = useProfileStore()

const addingStudent = ref<boolean>(false)

const role = computed(() => profileStore.role)

//const students = computed(() => {userStore.students})
const students = ref([])
//const students = reactive({test: getStudentsFromStore()})

function getStudentsFromStore() {
    return userStore.getStudents()
}

onMounted(() => {
    updateStudents()
    profileStore.getProfile();
})

async function updateStudents() {
    //await userStore.getStudents().then((response => {students.value = response; console.log(response)}))
}

function openStudentForm() {
    addingStudent.value = true
}

function closeStudentForm() {
    addingStudent.value = false
}

async function removeStudent(id:number) {
    await userStore.removeStudent(id)
    console.log("removed")
    updateStudents()
}

function test() {
    //console.log(students.test)
    removeStudent(2)
}


</script>

<template>
    <div v-if="role == 'teacher'" class="d-flex m-0 teacher-display">
        <Students class="border-end border-dark w-25" :students="students" @open-student-form="openStudentForm" @remove-student="removeStudent"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3"/>
            <button @click="test">Testing button</button>
            <Alert class="border-top border-dark p-3 pb-0"/>
        </div>
        <Questions class="border-start border-dark w-25"/>
        <AddStudentForm v-if="addingStudent" class="position-absolute top-50 start-50 translate-middle" @close="closeStudentForm"/>
    </div>

    <div class="" v-if="role == 'student'">
        <main class="d-flex justify-content-around align-items-center page-height">
            <AllQuestions/>
            <QuestionManager/>
        </main>
    </div>
</template>

<style scoped>
.page-height {
    height: 850px;
}

.teacher-display {
    height: 800px;
}

</style>