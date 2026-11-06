import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const deleteColumnApi = async (columnId) => {
  const response = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/columns/${columnId}`)
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