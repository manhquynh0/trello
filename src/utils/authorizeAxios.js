import axios from 'axios'
let authorizedAxiosInstance = axios.create()
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/PlaceHolderCard'
import { logoutUserApi } from '~/redux/user/userSlice'
import { refreshTokenApi } from '~/apis'
// thời gian xử lý tối đa 1 request
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// Cho phép axios tự động gửi cookie trong mỗi request lên BE ( phục vụ lưu accesstoken & refreshtoken vào trong httpOnly trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

// Cấu hình interceptors
// can thiệp vào các request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Can thiệp vào các response
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)
    // Mọi mã khác 200 sẽ rơi vào đây
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response.status !== 410) {
      toast.error(
        errorMessage,
        {
          style: {
            borderRadius: '12px',
            background: '#DC2626',
            color: '#fff',
            fontWeight: 'semi-bold'
          }
        }
      )
    }
    return Promise.reject(error)
  }
)
export default authorizedAxiosInstance