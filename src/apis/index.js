import {
  API_ROOT
} from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
// export const fetchBoardDetaislApi = async (boardId) => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data

// }
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
export const updateCardDetaislApi = async (columnId, updateColumn) => {
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