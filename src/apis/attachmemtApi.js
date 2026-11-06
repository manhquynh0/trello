import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
export const createdAttachmentApi = async (cardId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/attachments`, data)
  return response.data
}
export const deleteAttachmentApi = async (cardId, attachmentId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}/attachments/${attachmentId}`)
  return response.data
}