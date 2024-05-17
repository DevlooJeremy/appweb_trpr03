<script setup lang="ts">
import Students from "../components/TeacherComponent/Students.vue";
import Questions from "../components/TeacherComponent/Questions.vue";
import DetailedQuestion from "../components/TeacherComponent/DetailedQuestion.vue";
import Alert from "../components/TeacherComponent/Alert.vue";

import QuestionManager from "@/components/StudentComponent/QuestionManager.vue";
import AllQuestions from "@/components/StudentComponent/AllQuestions.vue";
import StudentQuestions from "@/components/StudentComponent/StudentQuestions.vue";

import Warning from "../components/Warning.vue";

import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from "@/stores/profileStore";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useQuestionStore } from "@/stores/questionStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useWarningStore } from "@/stores/warningStore";

//#region Both
const profileStore = useProfileStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const questionStore = useQuestionStore();
const categoryStore = useCategoryStore();
const warningStore = useWarningStore();

const role = computed(() => profileStore.role)
const detailedQuestionId = ref<number>(0)
const popupWindowOpen = ref<boolean>(false)

const showWarning = computed(() => (warningStore.warning??{isActive: false}).isActive)
const warningMessage = computed(() => (warningStore.warning??{message: "N/M"}).message)

onMounted(() => {
    profileStore.getProfile();
    setInterval(() => {warningStore.getWarning()}, 1000)
})

function openDetailedQuestion(id: number) {
    detailedQuestionId.value = id
}

function switchPopupState() {
    popupWindowOpen.value = !popupWindowOpen.value
}

function closeWarning() {
    warningStore.changeWarningState(false)
}
//#endregion

//#region Teacher
//#region Warning
function sendWarning(message:string) {
    warningStore.changeWarningMessage(message)
    warningStore.changeWarningState(true)
}
//#endregion
//#endregion

//#region Student

//#endregion


</script>

<template>
    <div v-if="role === 'teacher'" class="d-flex m-0 page-height">
        <Students class="border-end border-dark w-25" :popup-window-open="popupWindowOpen" @switch-popup-state="switchPopupState"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3" :popup-window-open="popupWindowOpen" :question-id="detailedQuestionId"/>
            <Alert class="border-top border-dark p-3 pb-0" :popup-window-open="popupWindowOpen" @send-warning="sendWarning"/>
        </div>
        <Questions class="border-start border-dark w-25" :popup-window-open="popupWindowOpen" @switch-popup-state="switchPopupState" @open-detailed-question="openDetailedQuestion"/>
    </div>

    <div v-if="role === 'student'">
        <main class="d-flex justify-content-around align-items-center page-height">
            <StudentQuestions/>
            <AllQuestions/>
            <QuestionManager/>
        </main>
    </div>

    <Warning v-if="showWarning" class="position-absolute top-50 start-50 translate-middle" :message="warningMessage" :role="role" @close="closeWarning"/>
</template>

<style scoped>
.page-height {
    height: 850px;
}
</style>