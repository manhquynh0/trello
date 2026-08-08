import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import {
  API_ROOT
} from '~/utils/constants'
import {
  toast
} from 'react-toastify'
//Các hành động gọi Api bất đồng bộ cập nhật dữ liệu vảo redux, dùng middleware createAsync Thunk đi kèm với extraReducers
export const loginUserApi = createAsyncThunk('user/loginUserApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)
export const logoutUserApi = createAsyncThunk('user/logoutUserApi',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Đăng xuất thành công')
    }
    return response.data
  }
)
const initialState = {
  currentUser: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // ExtraReducers : Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      const user = action.payload
      state.currentUser = user

    })
    builder.addCase(logoutUserApi.fulfilled, (state) => {
      // clear thông tin của user
      state.currentUser = null

    })

  }
})
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}
export const userReducer = userSlice.reducer