<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from "../../stores/categoryStore";
import { useQuestionStore } from "../../stores/questionStore"
import AddCategoryForm from "./AddCategoryForm.vue"
import MessagePopup from "./MessagePopup.vue";

const CATEGORY_REMOVAL_MESSAGE: string = "Vous êtes sur le point de supprimer une catégorie ET toutes les questions dans celle-ci! Voulez-vous procéder? Catégorie: "

const props = defineProps({
    popupWindowOpen: Boolean
})

const emit = defineEmits<{
    (event: 'switchPopupState'): void,
    (event: 'openDetailedQuestion', id: number): void
}>()

const categoryStore = useCategoryStore()
const questionStore = useQuestionStore()

const categories = computed(() => categoryStore.categories)
const questions = computed(() => questionStore.questions)

const addingCategory = ref<boolean>(false)
const categoryToRemove = ref<number>(0)
const popupOpened = ref<boolean>(false)
const popupMessage = ref<string>("Aucun message. Ceci est une erreur, veuillez appuyer sur «Annuler».")

onMounted(() => {
    categoryStore.getCategories()
    questionStore.getAllQuestions()
})

function openCategoryForm() {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        addingCategory.value = true
    }
}

function closeCategoryForm() {
    emit('switchPopupState')
    addingCategory.value = false
}

function openPopupMessage(message:string) {
    if (!props.popupWindowOpen) {
        emit('switchPopupState')
        popupMessage.value = message
        popupOpened.value = true
    }
}

function removeCategory(id:number, name: string) {
    if (!props.popupWindowOpen) {
        categoryToRemove.value = id
        openPopupMessage(CATEGORY_REMOVAL_MESSAGE + name)
    }
}

async function confirmFromPopup() {
    await categoryStore.removeCategory(categoryToRemove.value)
    closePopup()
}

function closePopup() {
    categoryToRemove.value = 0
    emit('switchPopupState')
    popupOpened.value = false
}

function openDetailedQuestion(id:number) {
    if (!props.popupWindowOpen) {
        emit('openDetailedQuestion', id)
    }
}

function isInCorrespondingCategory(categoryId: number, idToVerify: number) {
    return idToVerify == categoryId
}

</script>

<template>
    <div class="d-flex flex-column align-items-center py-3">
        <h1 class="title">Questions</h1>
        <div class="adding-button mb-2" @click="openCategoryForm">Créer catégorie +</div>
        <div class="w-100 border-top border-bottom border-dark container" v-for="category of categories">
            <div class="row my-2">
                <div class="col text-center text-muted fw-bold p-0">{{ category.name }}</div>
                <div class="col text-center text-danger p-0" @click="removeCategory(category.id, category.name)">Supprimer</div>
            </div>
            <div v-for="question of questions">
                <div class="row border border-dark rounded py-2 mx-3 my-1 question" :class="{'super-question': question.isSuper}" @click="openDetailedQuestion(question.id)" v-if="isInCorrespondingCategory(category.id, question.categoryId)">
                    <div class="col text-center">Sujet: {{ question.subject }}</div>
                    <div class="col text-center">Priorité: {{ question.priority }}</div>
                </div>
            </div>
        </div>
        <AddCategoryForm v-if="addingCategory" class="position-absolute top-50 start-50 translate-middle" @close="closeCategoryForm"/>
        <MessagePopup v-if="popupOpened" class="position-absolute top-50 start-50 translate-middle" :message="popupMessage" @confirm="confirmFromPopup" @close="closePopup"/>
    </div>
</template>

<style scoped>
.title {
    text-decoration: underline;
    max-width: fit-content;
}
.adding-button {
    color: #00d;
    max-width: fit-content;
}
.question {
    color: white;
    background-color: #00d;
    border: black;
}
.super-question {
    color: black;
    background-color: gold;
}

</style>