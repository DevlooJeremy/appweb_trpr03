<script setup lang="ts">
import Students from "../components/Students.vue";
import Questions from "../components/Questions.vue";
import DetailedQuestion from "../components/DetailedQuestion.vue";
import Alert from "../components/Alert.vue";


</script>

<template>
    <main v-if="true" class="d-flex m-0 teacher-display">
        <Students class="border-end border-dark w-25"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3"/>
            <Alert class="border-top border-dark p-3 pb-0"/>
        </div>
        <Questions class="border-start border-dark w-25"/>
    </main>
</template>

<style scoped>
.teacher-display{
    height: 800px;
}
</style>