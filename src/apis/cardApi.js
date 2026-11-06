import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
export const updateCardDetaislApi = async (cardId, updateCard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateCard)
  return response.data
}
export const createdNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
export const archiveCardApi = async (cardId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/cards/${cardId}`)
  return response.data
}

