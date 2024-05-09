<script setup lang="ts">
import Students from "../components/Students.vue";
import Questions from "../components/Questions.vue";
import DetailedQuestion from "../components/DetailedQuestion.vue";
import Alert from "../components/Alert.vue";

import QuestionManager from "@/components/StudentComponent/QuestionManager.vue";
import AllQuestions from "@/components/StudentComponent/AllQuestions.vue";

const TEACHER = false;
const STUDENT = true;

</script>

<template>
    <div v-if="TEACHER">
        <div><Students/></div>
        <div><Questions/></div>
        <div><DetailedQuestion/></div>
        <div><Alert/></div>
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
</style>