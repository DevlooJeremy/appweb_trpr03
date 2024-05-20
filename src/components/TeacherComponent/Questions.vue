<script setup lang="ts">
import { ref } from 'vue';
import AddCategoryForm from "./AddCategoryForm.vue"
import MessagePopup from "./MessagePopup.vue";

const CATEGORY_REMOVAL_MESSAGE: string = "Vous êtes sur le point de supprimer une catégorie ET toutes les questions dans celle-ci! Voulez-vous procéder? Catégorie: "

const props = defineProps({
    categories: Array<any>,
    questions: Array<any>,
    popupWindowOpen: Boolean
})

const emit = defineEmits<{
    (event: 'addCategory', name:string): void,
    (event: 'removeCategory', id:number): void,
    (event: 'switchPopupState'): void,
    (event: 'openDetailedQuestion', id: number): void
}>()

const addingCategory = ref<boolean>(false)
const categoryToRemove = ref<number>(0)
const popupOpened = ref<boolean>(false)
const popupMessage = ref<string>("Aucun message. Ceci est une erreur, veuillez appuyer sur «Annuler».")

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

function addCategory(name:string) {
    emit('addCategory', name)
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

function confirmFromPopup() {
    emit('removeCategory', categoryToRemove.value)
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

function isCorrespondingCategory(categoryId: number, idToVerify: number) {
    return idToVerify == categoryId
}

</script>

<template>
    <div class="d-flex flex-column align-items-center py-3">
        <h1 class="title">Questions</h1>
        <div class="adding-button mb-2" @click="openCategoryForm" name="addCategory">Créer catégorie +</div>
        <div class="w-100 border-top border-bottom border-dark container" v-for="category of props.categories">
            <div class="row my-2">
                <div class="col text-center text-muted fw-bold p-0" name="categoryName">{{ category.name }}</div>
                <div class="col text-center text-danger p-0" @click="removeCategory(category.id, category.name)" name="deleteButton">Supprimer</div>
            </div>
            <div v-for="question of props.questions">
                <div class="row border border-dark rounded py-2 mx-3 my-1 question" :class="{'super-question': question.isSuper}" name="question" @click="openDetailedQuestion(question.id)" v-if="isCorrespondingCategory(category.id, question.categoryId)">
                    <div class="col text-center" name="questionSubject">Sujet: {{ question.subject }}</div>
                    <div class="col text-center" name="questionPriority">Priorité: {{ question.priority }}</div>
                </div>
            </div>
        </div>
        <AddCategoryForm v-if="addingCategory" class="position-absolute top-50 start-50 translate-middle" @add-category="addCategory" @close="closeCategoryForm"/>
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