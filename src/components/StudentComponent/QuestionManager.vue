<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useCategoryStore } from '@/stores/categoryStore';
import { useQuestionStore } from '@/stores/questionStore';
import { computed, onMounted, ref } from 'vue'

const authStore = useAuthStore();
const questionStore = useQuestionStore();
const categoryStore = useCategoryStore();

const categories = computed<any>(() => categoryStore.categories);

const isSuper = defineModel<boolean>("isSuper");
const question = defineModel<string>("question");
const priority = defineModel<string>("priority");
const subject = defineModel<string>("subject");
const isPrivate = defineModel<boolean>("isPrivate");
const categoryModel = defineModel<string>("category");

const subjectOnError = ref<boolean>(false);
const questionOnError = ref<boolean>(false);
const categoryOnError = ref<boolean>(false);

const SUBJECT_ERROR_MESSAGE = "Le sujet de la question est obligatoire.";
const QUESTION_ERROR_MESSAGE = "La question est obligatoire.";
const CATEGORY_ERROR_MESSAGE = "La catégorie de la question est obligatoire.";

onMounted(() => {
    isSuper.value = false;
    priority.value = "1";
    isPrivate.value = false;
    categoryStore.getCategories();
})

function isSubjectValid(): boolean {
    if (subject.value == undefined || subject.value.trim() == "") {
        return false;
    }
    return true;
}

function isQuestionValid(): boolean {
    if (question.value == undefined || question.value.trim() == "") {
        return false;
    }
    return true;
}

function isCategoryValid(): boolean {
    if (categoryModel.value == undefined) {
        return false;
    }
    return true;
}

async function onSubmit() {
    if (!isSubjectValid()) {
        subjectOnError.value = true;
        questionOnError.value = false;
        categoryOnError.value = false;
        return;
    };
    if (!isQuestionValid()) {
        questionOnError.value = true;
        subjectOnError.value = false;
        categoryOnError.value = false;
        return;
    };
    if (!isCategoryValid()) {
        categoryOnError.value = true;
        subjectOnError.value = false;
        questionOnError.value = false;
        return;
    };
    subjectOnError.value = false;
    questionOnError.value = false;
    categoryOnError.value = false;
    let questionId: number = await questionStore.createQuestion(question.value, parseInt(categoryModel.value), subject.value, parseInt(priority.value), isSuper.value, isPrivate.value);
}
</script>

<template>
    <main>
        <h1 class="text-center">Créer une question</h1>
            <form class="border border-dark border-2 p-3" @submit.prevent="onSubmit">
                <input name="subject" v-model="subject" class="form-control" type="text" placeholder="Sujet">
                <div v-if="subjectOnError" class="px-2 py-1 mt-3 bg-danger text-white rounded">{{ SUBJECT_ERROR_MESSAGE }}</div>
                <textarea class="form-control my-3" name="question" v-model="question" placeholder="Question" cols="50" rows="5"></textarea>
                <div v-if="questionOnError" class="px-2 py-1 mb-3 bg-danger text-white rounded">{{ QUESTION_ERROR_MESSAGE }}</div>
                <div class="d-flex justify-content-around align-items-center">
                    <div>
                        <label for="priority">Priorité:</label>
                        <select v-model="priority" name="priority">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label for="category">Choisir une catégorie:</label>
                        <select v-model="categoryModel" name="category" id="category">
                            <option v-for="category of categories" :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="private">Privée:</label>
                        <input v-model="isPrivate" type="checkbox" name="private" id="private">
                    </div>
                    <div>
                        <label for="super">Super:</label>
                        <input v-model="isSuper" type="checkbox" name="super" id="super">
                    </div>
                </div>
                <div v-if="categoryOnError" class="px-2 py-1 mb-3 bg-danger text-white rounded">{{ CATEGORY_ERROR_MESSAGE }}</div>
                <div class="d-flex">
                    <button name="submit" class="btn btn-primary ms-auto m-2">Envoyer la question</button>
                </div>
            </form>
            
    </main>
</template>

<style scoped>
form {
    height: 600px;
    width: 700px;
}
label {
    margin: 5px;
}
</style>