import {
  API_ROOT
} from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

export const createdLabelApi = async (cardId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/labels`, data)
  return response.data
}
export const activeLabelApi = async (cardId, labelId, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}/labels/${labelId}`, data)
  return response.data
}
export const deleteLabelApi = async (cardId, labelId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}/labels/${labelId}`)
  return response.data
}

export const fetchLabelsApi = async (cardId, search) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cards/${cardId}/labels${search}`)
  return response.data
}