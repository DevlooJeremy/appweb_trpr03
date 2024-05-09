<script setup lang="ts">
import Students from "../components/TeacherComponent/Students.vue";
import Questions from "../components/TeacherComponent/Questions.vue";
import DetailedQuestion from "../components/TeacherComponent/DetailedQuestion.vue";
import Alert from "../components/TeacherComponent/Alert.vue";
import AddStudentForm from "../components/TeacherComponent/AddStudentForm.vue";
import QuestionManager from "@/components/StudentComponent/QuestionManager.vue";
import AllQuestions from "@/components/StudentComponent/AllQuestions.vue";

const TEACHER = true;
const STUDENT = false;

</script>

<template>
    <div v-if="TEACHER" class="d-flex m-0 teacher-display">
        <Students class="border-end border-dark w-25"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3"/>
            <Alert class="border-top border-dark p-3 pb-0"/>
        </div>
        <Questions class="border-start border-dark w-25"/>
        <AddStudentForm v-if="true" class="position-absolute top-50 start-50 translate-middle"/>
    </div>
    <div class="" v-if="STUDENT">
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