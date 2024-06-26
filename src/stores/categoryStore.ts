import { defineStore } from 'pinia'
import { ref} from 'vue'
import { categoryService } from '../services/categoryService'

export const useCategoryStore = defineStore('useCategoryStore', () => {

    const categories = ref<any>()

    async function getCategoryById(id:number) {
        try {
            return await categoryService.getCategoryById(id)
        } catch (error) {
            console.log(error)
        }
    }

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
        getCategoryById,
        getCategories,
        addCategory,
        removeCategory,
        categories
    }

});