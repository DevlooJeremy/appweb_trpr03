import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const URL = "http://127.0.0.1:3000/categories";

async function getCategoryById (id: number) {
  try {
    const response = await axiosAuth.get(URL, {
      params: {
          id: id
      }
  });

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function postCategory(category: {name: string}) {
  await axiosAuth.post(URL, category)
}

async function getCategories () {
  try {
    const response = await axiosAuth.get(URL)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteCategory(id:number) {
  await axiosAuth.delete(URL + '/' + id)
}

export const categoryService = {
    getCategoryById,
    getCategories,
    postCategory,
    deleteCategory
}
