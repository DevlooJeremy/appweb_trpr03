<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import Timer from "./Timer.vue"
import MessagePopup from "./MessagePopup.vue";

const STUDENT_REMOVAL_MESSAGE: string = "Vous êtes sur le point de supprimer la question! Voulez-vous procéder?"

const props = defineProps({
  questionId: Number,
  studentName: String,
  category: String,
  questionDetail: String,
  popupWindowOpen: Boolean
})

const popupOpened = ref<boolean>(false)
const popupMessage = ref<string>("Aucun message. Ceci est une erreur, veuillez appuyer sur «Annuler».")

const time = ref<number>(0)
const timer = ref<string>("00:00")
const timerRunning = ref<boolean>(false)

const emit = defineEmits<{
  (event: 'deleteQuestion'): void,
  (event: 'switchPopupState'): void
}>()

onMounted(() => {
  setInterval(() => {if(time.value > 0 && timerRunning.value) setTime(time.value - 1)}, 1000)
})

function openPopupMessage(message:string) {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        popupMessage.value = message
        popupOpened.value = true
    }
}

function deleteQuestion() {
    if (!props.popupWindowOpen && props.questionId && props.questionId > 0) {
        openPopupMessage(STUDENT_REMOVAL_MESSAGE)
    }
}

function confirmFromPopup() {
    emit('deleteQuestion')
    closePopup()
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

function resetTimer() {
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
        <h1 class="me-3" name="studentName">{{props.studentName??"Nom de l'élève"}}</h1>
        <h3 class="text-secondary" name="categoryName">{{props.category??"Catégorie"}}</h3>
      </div>
      <h4>{{timer}}</h4>
    </div>
    <p name="questionDetail">{{props.questionDetail??"Question détaillée."}}</p>
    <div class="mt-auto d-flex flex-column">
      <div class="btn text-danger btn-outline-dark border-2 fw-bold ms-auto m-2" @click="deleteQuestion" name="deleteButton">Supprimer</div>
      <Timer class="border-top border-3 mt-2" :popup-window-open="props.popupWindowOpen" @start-timer="startTimer" @set-time="setTime" @stop-timer="stopTimer" @reset-timer="resetTimer"/>
      <MessagePopup v-if="popupOpened" class="position-absolute top-50 start-50 translate-middle" :message="popupMessage" @confirm="confirmFromPopup" @close="closePopup"/>
    </div>
  </div>
</template>

<style scoped></style>