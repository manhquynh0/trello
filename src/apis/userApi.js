import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'
export const forgotPasswordApi = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/forgotPassword`, data)
  toast.success(`Email đã được gửi đến ${data.email}`)
  return response.data
}
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
export const refreshTokenApi = async () => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}
