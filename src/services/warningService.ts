import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const URL = "http://127.0.0.1:3000/warnings";

async function getWarning () {
  try {
    const response = await axiosAuth.get(URL);

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateWarningMessage (newMessage: string) {
    try {
      await axiosAuth.patch(URL + "/" + 1, {
          message: newMessage
      });
    } catch (error) {
      throw parseAxiosError(error);
    }
}

async function updateWarningState (isActive: boolean) {
    try {
      await axiosAuth.patch(URL + "/" + 1, {
          isActive: isActive
      });
    } catch (error) {
      throw parseAxiosError(error);
    }
}

export const warningService = {
    getWarning,
    updateWarningMessage,
    updateWarningState
}
