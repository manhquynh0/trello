import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
export const createChecklist = async (cardId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/checklist`, data)
  return response.data
}
export const createChecklistItem = async (cardId, checklistId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/checklist/${checklistId}`, data)
  return response.data
}