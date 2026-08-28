import axios from 'axios'
let authorizedAxiosInstance = axios.create()
import {
  toast
} from 'react-toastify'
import {
  interceptorLoadingElements
} from '~/utils/PlaceHolderCard'
import {
  logoutUserApi
} from '~/redux/user/userSlice'
import {
  refreshTokenApi
} from '~/apis'

// Không thể import { store} theo cách thông thường ở các file js thuần, để làm đc việc đó ta sử dụng inject store
let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}
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

let refreshTokenPromise = null
// Can thiệp vào các response
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)

    // Xử lý refreshToken tự động
    // TH1 : Nếu như nhẫn mã 401 (unathorize) thì gọi api đăng xuất luôn
    if (error?.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserApi(false))
    }

    //TH2 : mã 410 ( accessToken hết hạn ) thì gọi API refresh để làm mới lại AT
    // Đầu tiên cần lấy các request API đang bị lỗi trước đó
    const originalRequest = error.config
    if (error?.response?.status === 410 && !originalRequest._retry) {
      // gán 1 biến retry luôn bằng true trong khoảng thời gian chờ để đảm bảo việc refresh chỉ luôn gọi lại 1 lần tại 1 thời điểm
      originalRequest._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
          .then((data) => {
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(logoutUserApi(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      return refreshTokenPromise.then((accessToken) => {
        // b1 : đối với trường hợp nêys cần lưu AT vào localstorage hoặc 1 nơi nào khác thì sẽ xử lý ở đây hihi

        // b2 : Important : return lại axios instance của chúng ta kết hợp với các originalRequest để gọi lại các api ban đâu bị lõi
        return authorizedAxiosInstance(originalRequest)
      })
    }

    // Mọi mã khác 200 sẽ rơi vào đây
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response.status !== 410) {
      toast.error(errorMessage, {
        style: {
          borderRadius: '12px',
          fontWeight: 'semi-bold'
        }
      })
    }
    return Promise.reject(error)
  }
)
export default authorizedAxiosInstance