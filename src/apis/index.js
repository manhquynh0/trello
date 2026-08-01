import axios from 'axios'
import {
  API_ROOT
} from '~/utils/constants'
export const fetchBoardDetaislApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data

}
export const updateBoardDetaislApi = async (boardId, updateBoard) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateBoard)
  return response.data
}
export const updateCardDetaislApi = async (columnId, updateColumn) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateColumn)
  return response.data
}
export const createdNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data

}
export const createdNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data

}