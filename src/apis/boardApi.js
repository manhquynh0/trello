import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const updateBoardDetaislApi = async (boardId, updateBoard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateBoard)
  return response.data
}
export const moveCardtoDifferentColumnApi = async (updateBoard) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateBoard)
  return response.data
}
export const deleteBoardApi = async (boardId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/boards/${boardId}`)
  toast.success('Đã xóa vĩnh viễn')
  return response.data
}
export const fetchBoardsApi = async (searchBoard) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards${searchBoard}`)
  return response.data
}
export const fetchFilteredBoardApi = async (boardId, filters) => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== 'any') params.set(key, value)
  })
  const query = params.toString()
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}/cards${query ? `?${query}` : ''}`)
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
