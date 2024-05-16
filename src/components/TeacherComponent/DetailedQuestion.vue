<script setup lang="ts">
import Timer from "./Timer.vue"
import { ref } from "vue"

const props = defineProps({
  studentName: String,
  questionCategory: String,
  question: String,
  questionId: Number
})

const timer = ref("00:00")
const time = ref(0)

const emit = defineEmits<{
  (event: 'deleteQuestion', id: number): void
}>()

function deleteQuestion() {
  emit('deleteQuestion', props.questionId??0)
}

function startTimer() {
  
}

function setTime(newTime: number) {
  console.log("test")
  time.value = newTime
  timer.value = formatTime(newTime)
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
        <h1 class="me-3">{{props.studentName??"Nom de l'élève"}}</h1>
        <h3 class="text-secondary">{{props.questionCategory??"Catégorie"}}</h3>
      </div>
      <h4>{{timer}}</h4>
    </div>
    <p>{{ props.question??"Question détaillée." }}</p>
    <div class="mt-auto d-flex flex-column">
      <div class="btn text-danger btn-outline-dark border-2 fw-bold ms-auto m-2" @click="deleteQuestion">Supprimer</div>
      <Timer class="border-top border-3 mt-2" :on-start-timer="startTimer" :on-set-time="setTime"/>
    </div>
  </div>
</template>

<style scoped></style>