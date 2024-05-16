import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getUserById (userId: number) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/users/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function postUser(user: {email: string, password: string, name: string, id: number, role: string}) {
  await axiosAuth.post(`http://127.0.0.1:3000/users`,user)
}

async function changePassword(user:{id: number, password: string}) {
  try {
    await axiosAuth.patch(`http://127.0.0.1:3000/users` + `/` + user.id, {
        password: user.password
    });
  } catch (error) {
    throw parseAxiosError(error);
  }
}

async function getUsers () {
  try {
    const response = await axiosAuth.get(`http://127.0.0.1:3000/users`)
    console.log(response)

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser(userId:number) {
  await axiosAuth.delete(`http://127.0.0.1:3000/users/${userId}`)
  console.log("test")
}

export const userService = {
  getUserById,
  postUser,
  getUsers,
  deleteUser,
  changePassword
}
