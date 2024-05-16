import { defineStore } from 'pinia'
import { ref} from 'vue'
import { categoryService } from '../services/categoryService'

export const useCategoryStore = defineStore('useCategoryStore', () => {

    const categories = ref<any>()

    async function getCategories() {
        try {
            categories.value = await categoryService.getCategories()
        } catch (error) {
            console.log(error)
        }
    }

    async function addCategory(name: string) {
        try {
            await categoryService.postCategory({name: name})
            getCategories()
        } catch (error) {
            console.log(error)
        }
    }

    async function removeCategory(id:number) {
        try {
            await categoryService.deleteCategory(id)
            getCategories()
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getCategories,
        addCategory,
        removeCategory,
        categories
    }

});