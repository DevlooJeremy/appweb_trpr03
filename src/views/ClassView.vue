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

const categories = computed(() => categoryStore.categories)

const showWarning = computed(() => (warningStore.warning??{isActive: false}).isActive)
const warningMessage = computed(() => (warningStore.warning??{message: "N/M"}).message)

onMounted(() => {
    profileStore.getProfile();
    setInterval(() => {warningStore.getWarning()}, 1000)
    userStore.getUsers()
    categoryStore.getCategories()
    questionStore.getAllQuestions()
    questionStore.getQuestions();
    questionStore.getAllPublicQuestions();
})

function switchPopupState() {
    popupWindowOpen.value = !popupWindowOpen.value
}

function closeWarning() {
    warningStore.changeWarningState(false)
}
//#endregion


//#region Teacher

//#region Students
const students = computed(() => userStore.users)

async function addStudent(name:string, password:string, email:string) {
    await userStore.addStudent(name, password, email)
}

async function removeStudent(id:number) {
    await userStore.removeStudent(id)
}
//#endregion

//#region Questions
const questions = computed(() => questionStore.questions)


async function addCategory(name:string) {
    categoryStore.addCategory(name)
}

async function removeCategory(id:number) {
    await categoryStore.removeCategory(id)
}
//#endregion

//#region QuestionsDetail
const studentName = ref<string>()
const category = ref<string>()
const questionDetail = ref<string>()

function openDetailedQuestion(id: number) {
    if (id != detailedQuestionId.value) {
        detailedQuestionId.value = id
        getStudentName()
        getQuestionCategory()
        getQuestionDetails()
    }
}

async function getStudentName() {
    let userId:number = await questionStore.getQuestionById(detailedQuestionId.value??0).then((response) => {return response.userId})
    studentName.value = await userStore.getUserById(userId).then((response) => {return response.name})
}

async function getQuestionCategory() {
    let categoryId:number = await questionStore.getQuestionById(detailedQuestionId.value??0).then((response) => {return response.categoryId})
    category.value = await categoryStore.getCategoryById(categoryId).then((response) => {return response.name})
}

async function getQuestionDetails() {
    questionDetail.value = await questionStore.getQuestionById(detailedQuestionId.value??0).then((response) => {return response.question})
}

async function deleteDetailedQuestion() {
    await questionStore.deleteQuestion(detailedQuestionId.value)  
    detailedQuestionId.value = 0
    studentName.value = "Nom de l'élève"
    category.value = "Catégorie"
    questionDetail.value = "Question détaillée."
}
//#endregion

//#region Warning
function sendWarning(message:string) {
    warningStore.changeWarningMessage(message)
    warningStore.changeWarningState(true)
}
//#endregion
//#endregion

//#region Student
const userQuestions = computed(() => questionStore.userQuestions)
const publicQuestions = computed(() => questionStore.publicQuestions)

    async function handleAddQuestion(question: string, category: number, subject: string, priority: number, isSuper: boolean, isPrivate: boolean) {
        await questionStore.createQuestion(question,category,subject,priority,isSuper,isPrivate);
    }

    async function handleDeleteQuestion(questionId: number) {
        await questionStore.deleteQuestion(questionId)
    }

//#endregion


</script>

<template>
    <div v-if="role === 'teacher'" class="d-flex m-0 page-height border-bottom border-dark">
        <Students class="border-end border-dark w-25" :students="students" :popup-window-open="popupWindowOpen" @add-student="addStudent" @remove-student="removeStudent" @switch-popup-state="switchPopupState"/>
        <div class="flex-fill">
            <DetailedQuestion class="h-75 p-3" :question-id="detailedQuestionId" :student-name="studentName" :category="category" :question-detail="questionDetail" :popup-window-open="popupWindowOpen" @delete-question="deleteDetailedQuestion" @switch-popup-state="switchPopupState"/>
            <Alert class="border-top border-dark p-3 pb-0" :popup-window-open="popupWindowOpen" @send-warning="sendWarning"/>
        </div>
        <Questions class="border-start border-dark w-25" :categories="categories" :questions="questions" :popup-window-open="popupWindowOpen" @add-category="addCategory" @remove-category="removeCategory" @switch-popup-state="switchPopupState" @open-detailed-question="openDetailedQuestion"/>
    </div>

    <div v-if="role === 'student'">
        <main class="d-flex justify-content-around align-items-center page-height">
            <StudentQuestions :questions="userQuestions" @deleteQuestion="handleDeleteQuestion"/>
            <AllQuestions :questions="publicQuestions"/>
            <QuestionManager :categories="categories" @addQuestion="handleAddQuestion"/>
        </main>
    </div>

    <Warning v-if="showWarning" class="position-absolute top-50 start-50 translate-middle" :message="warningMessage" :role="role" @close="closeWarning"/>
</template>

<style scoped>
.page-height {
    height: 850px;
}
</style>