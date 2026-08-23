import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
// Khoi tao gia tri State cua 1 Slice trong Redux
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import {
  API_ROOT
} from '~/utils/constants'
//Các hành động gọi Api bất đồng bộ cập nhật dữ liệu vảo redux, dùng middleware createAsync Thunk đi kèm với extraReducers
export const fetchNotificationsAPI = createAsyncThunk('notifications/fetchNotificationsAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)
export const updateBoardInvitationAPI = createAsyncThunk('notifications/updateBoardInvitationAPI',
  async ({
    notificationId,
    status
  }) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${notificationId}`, { status })
    return response.data
  }
)
const initialState = {
  currentNotifications: []
}
//Khoi tao 1 Silce trong kho luu tru - Redux store
export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  // Noi xy ly du lieu dong bo
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = []
    },
    updateCurrentnotifications: (state, action) => {
      // action.payload la chuan dat ten nhan du lieu vao reducer, o day chung ta gan no ra 1 bien co nghia hon
      const notification = action.payload

      // Xử ly du lieu khi can thiet

      // Update lai du lieu cua currenActivenotification
      state.currentNotifications = notification
    },
    addCurrentnotifications: (state, action) => {
      const imcomingInvitation = action.payload

      state.currentNotifications.unshift(imcomingInvitation)


    }
  },
  // ExtraReducers : Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      const imcomingInvitation = action.payload
      const invitations = Array.isArray(imcomingInvitation)
        ? imcomingInvitation
        : imcomingInvitation?.invitations || imcomingInvitation?.data || []

      state.currentNotifications = [...invitations].reverse()


    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      const imcomingInvitation = action.payload
      const invitationIndex = state.currentNotifications.findIndex(i => i._id === imcomingInvitation?._id)

      if (invitationIndex !== -1) {
        state.currentNotifications[invitationIndex] = imcomingInvitation
      }


    })

  }
})

// ation la noi dành cho các components bên dưới gọi bằng dispatch() tới nơi cập nhật lại dữ liệu thông qua reducer( chạy đồng bô)
// actions được tạo tự động
export const {
  clearCurrentNotifications,
  updateCurrentnotifications,
  addCurrentnotifications
} = notificationSlice.actions
export const selectCurrentNotifications = state => {
  return state.notifications.currentNotifications || []
}
export const notificationReducer = notificationSlice.reducer