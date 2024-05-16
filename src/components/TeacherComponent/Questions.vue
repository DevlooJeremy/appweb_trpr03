<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from "../../stores/categoryStore";
import { useQuestionStore } from "../../stores/questionStore"

const categoryStore = useCategoryStore()
const questionStore = useQuestionStore()

const categories = computed(() => categoryStore.categories)
const questions = computed(() => questionStore.questions)

const addingCategory = ref<boolean>(false)

function openCategoryForm() {
    addingCategory.value = true
}

function closeCategoryForm() {
    addingCategory.value = false
}

onMounted(() => {
    categoryStore.getCategories()
    questionStore.getQuestions()
})

async function removeStudent(id:number) {
    await categoryStore.removeCategory(id)
}

function isInCorrespondingCategory(categoryId: number, idToVerify: number) {
    return idToVerify == categoryId
}

</script>

<template>
    <div class="d-flex flex-column align-items-center py-3">
        <h1 class="title">Questions</h1>
        <div class="addingButton mb-2">Créer catégorie +</div>
        <div class="w-100 border-top border-bottom border-dark" v-for="category of categories">
            <div class="row my-2">
                <div class="col text-center text-muted fw-bold">{{ category.name }}</div>
                <div class="col text-center text-danger">Supprimer</div>
            </div>
            <div v-for="question of questions">
                <div class="py-2 border-top border-bottom border-dark mx-3 my-1" v-if="isInCorrespondingCategory(category.id, question.categoryId)">
                    <div class="text-center">{{ question.subject }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    text-decoration: underline;
    max-width: fit-content;
}
.addingButton {
    color: #00d;
    max-width: fit-content;
}
</style>