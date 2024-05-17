<script setup lang="ts">
import Students from "../components/TeacherComponent/Students.vue";
import Questions from "../components/TeacherComponent/Questions.vue";
import DetailedQuestion from "../components/TeacherComponent/DetailedQuestion.vue";
import Alert from "../components/TeacherComponent/Alert.vue";
import QuestionManager from "@/components/StudentComponent/QuestionManager.vue";
import AllQuestions from "@/components/StudentComponent/AllQuestions.vue";
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from "@/stores/profileStore";

const profileStore = useProfileStore();

const role = computed(() => profileStore.role)
const detailedQuestionId = ref<number>(0)
const popupWindowOpen = ref<boolean>(false)

onMounted(() => {
    profileStore.getProfile();
})

function openDetailedQuestion(id: number) {
    detailedQuestionId.value = id
}

function switchPopupState() {
    popupWindowOpen.value = !popupWindowOpen.value
}

</script>

<template>
    <div v-if="role === 'teacher'" class="d-flex m-0 page-height">
        <Students class="border-end border-dark w-25" :popup-window-open="popupWindowOpen" @switch-popup-state="switchPopupState"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3" :popup-window-open="popupWindowOpen" :question-id="detailedQuestionId"/>
            <Alert class="border-top border-dark p-3 pb-0" :popup-window-open="popupWindowOpen"/>
        </div>
        <Questions class="border-start border-dark w-25" :popup-window-open="popupWindowOpen" @switch-popup-state="switchPopupState" @open-detailed-question="openDetailedQuestion"/>
    </div>

    <div v-if="role === 'student'">
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