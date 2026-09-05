import {
  API_ROOT
} from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'
// export const fetchBoardDetaislApi = async (boardId) => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data

// }

export const registerAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Đăng kí thành công, vui lòng vào Email để xác thực tài khoản')
  return response.data
}
export const verifyAccountApi = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Xác thực tài khoản thành công, hãy đăng nhập ')
  return response.data
}
export const updateBoardDetaislApi = async (boardId, updateBoard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateBoard)
  return response.data
}
export const moveCardtoDifferentColumnApi = async (updateBoard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateBoard)
  return response.data
}
export const deleteColumnApi = async (columnId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}
export const archiveBoardApi = async (boardId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/boards/${boardId}`)
  toast.success('Đã chuyển sang thùng rác')
  return response.data
}
export const undoBoardApi = async (boardId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/boards/${boardId}/undodelete`)
  toast.success('Đã khôi phục')
  return response.data
}
export const deleteBoardApi = async (boardId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/boards/${boardId}`)
  toast.success('Đã xóa vĩnh viễn')
  return response.data
}
export const updateCardDetaislApi = async (cardId, updateCard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateCard)
  return response.data
}
export const updateColumnDetaislApi = async (columnId, updateColumn) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateColumn)
  return response.data
}
export const createdNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data

}
export const createdNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const refreshTokenApi = async () => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}
export const fetchBoardsApi = async (searchBoard) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards${searchBoard}`)
  return response.data
}
export const fetchLabelsApi = async (cardId, search) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/cards/${cardId}/labels${search}`)
  return response.data
}
export const createdNewBoardsApi = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards`, data)
  toast.success('Tạo thành công, hãy ấn vào để xem chi tiết')
  return response.data
}
export const inviteUserToBoardApi = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('Gửi lời mời thành công')
  return response.data
}
export const createdAttachmentApi = async (cardId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/attachments`, data)
  return response.data
}
export const deleteAttachmentApi = async (cardId, attachmentId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}/attachments/${attachmentId}`)
  return response.data
}
export const archiveCardApi = async (cardId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/cards/${cardId}`)
  return response.data
}
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
export const createChecklist = async (cardId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/checklist`, data)
  return response.data
}
export const createChecklistItem = async (cardId, checklistId, data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/${cardId}/checklist/${checklistId}`, data)
  return response.data
}

