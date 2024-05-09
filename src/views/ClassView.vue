<script setup lang="ts">
import Students from "../components/TeacherComponent/Students.vue";
import Questions from "../components/TeacherComponent/Questions.vue";
import DetailedQuestion from "../components/TeacherComponent/DetailedQuestion.vue";
import Alert from "../components/TeacherComponent/Alert.vue";
import AddStudentForm from "../components/TeacherComponent/AddStudentForm.vue";



</script>

<template>
    <main v-if="true" class="d-flex m-0 teacher-display">
        <Students class="border-end border-dark w-25"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3"/>
            <Alert class="border-top border-dark p-3 pb-0"/>
        </div>
        <Questions class="border-start border-dark w-25"/>
        <AddStudentForm v-if="true" class="position-absolute top-50 start-50 translate-middle"/>
    </main>
</template>

<style scoped>
.teacher-display{
    height: 800px;
}
</style>