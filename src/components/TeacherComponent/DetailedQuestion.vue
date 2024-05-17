<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useUserStore } from "../../stores/userStore";
import { useQuestionStore } from "../../stores/questionStore"
import { useCategoryStore } from "../../stores/categoryStore";
import Timer from "./Timer.vue"
import MessagePopup from "./MessagePopup.vue";

const STUDENT_REMOVAL_MESSAGE: string = "Vous êtes sur la question! Voulez-vous procéder?"

const props = defineProps({
  questionId: Number,
  popupWindowOpen: Boolean
})

const userStore = useUserStore()
const questionStore = useQuestionStore()
const categoryStore = useCategoryStore()

const questionId = ref<number>()
const studentName = ref<string>()
const category = ref<string>()
const questionDetail = ref<string>()
const popupOpened = ref<boolean>(false)
const popupMessage = ref<string>("Aucun message. Ceci est une erreur, veuillez appuyer sur «Annuler».")

const time = ref<number>(0)
const timer = ref<string>("00:00")
const timerRunning = ref<boolean>(false)

const emit = defineEmits<{
  (event: 'switchPopupState'): void
}>()

onMounted(() => {
  setInterval(() => {if(time.value > 0 && timerRunning.value) setTime(time.value - 1)}, 1000)
})

watch(() => props.questionId, () => {
  questionId.value = props.questionId
  getStudentName()
  getQuestionCategory()
  getQuestionDetails()
})

async function getStudentName() {
  let userId:number = await questionStore.getQuestionById(props.questionId??0).then((response) => {return response.userId})
  studentName.value = await userStore.getUserById(userId).then((response) => {return response.name})
}

async function getQuestionCategory() {
  let categoryId:number = await questionStore.getQuestionById(props.questionId??0).then((response) => {return response.categoryId})
  category.value = await categoryStore.getCategoryById(categoryId).then((response) => {return response.name})
}

async function getQuestionDetails() {
  questionDetail.value = await questionStore.getQuestionById(props.questionId??0).then((response) => {return response.question})
}

function openPopupMessage(message:string) {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        popupMessage.value = message
        popupOpened.value = true
    }
}

function deleteQuestion() {
    if (!props.popupWindowOpen && questionId.value && questionId.value > 0) {
        openPopupMessage(STUDENT_REMOVAL_MESSAGE)
    }
}

async function confirmFromPopup() {
    await questionStore.deleteQuestion(props.questionId??0)
    setAllQuestionValuesToBase()
    closePopup()
}

function setAllQuestionValuesToBase() {
  questionId.value = 0
  studentName.value = "Nom de l'élève"
  category.value = "Catégorie"
  questionDetail.value = "Question détaillée."
}

function closePopup() {
    emit('switchPopupState')
    popupOpened.value = false
}

function startTimer() {
  timerRunning.value = true
}

function setTime(newTime: number) {
  time.value = newTime
  timer.value = formatTime(newTime)
}

function stopTimer() {
  timerRunning.value = false
}

function reinitialiseTimer() {
  setTime(0)
}

function formatTime(timeInSec: number) {
  let minutes: number = Math.floor(timeInSec / 60)
  let seconds: number = Math.floor(timeInSec - (minutes*60))
  let minutesString: string = `${minutes}`
  let secondsString: string = `${seconds}`
  
  if (minutes < 10) {
    minutesString = `0${minutes}`
  }
  if (seconds < 10) {
    secondsString = `0${seconds}`
  }
  return `${minutesString}:${secondsString}`
}

</script>

<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-end justify-content-between">
      <div class="d-flex align-items-end">
        <h1 class="me-3">{{studentName??"Nom de l'élève"}}</h1>
        <h3 class="text-secondary">{{category??"Catégorie"}}</h3>
      </div>
      <h4>{{timer}}</h4>
    </div>
    <p>{{ questionDetail??"Question détaillée." }}</p>
    <div class="mt-auto d-flex flex-column">
      <div class="btn text-danger btn-outline-dark border-2 fw-bold ms-auto m-2" @click="deleteQuestion">Supprimer</div>
      <Timer class="border-top border-3 mt-2" :popup-window-open="props.popupWindowOpen" @start-timer="startTimer" @set-time="setTime" @stop-timer="stopTimer" @reinitialise-timer="reinitialiseTimer"/>
      <MessagePopup v-if="popupOpened" class="position-absolute top-50 start-50 translate-middle" :message="popupMessage" @confirm="confirmFromPopup" @close="closePopup"/>
    </div>
  </div>
</template>

<style scoped></style>