import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const URL = "http://127.0.0.1:3000/users";

async function getUserById (userId: number) {
  try {
    const response = await axiosAuth.get(URL + "/" + userId);
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function postUser(user: {email: string, password: string, name: string, role: string}) {
  await axiosAuth.post(URL, user)
}

async function changePassword(user:{id: number, password: string}) {
  try {
    await axiosAuth.patch(URL + `/` + user.id, {
        password: user.password
    });
  } catch (error) {
    throw parseAxiosError(error);
  }
}

async function getUsers () {
  try {
    const response = await axiosAuth.get(URL)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser(userId:number) {
  await axiosAuth.delete(URL + '/' + userId)
}

export const userService = {
  getUserById,
  postUser,
  getUsers,
  deleteUser,
  changePassword
}
