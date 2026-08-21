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
export const fetchCardDetailsAPI = createAsyncThunk('activeCard/fetchCardDetailsAPI',
  async (cardId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/Cards/${cardId}`)
    return response.data
  }
)
const initialState = {
  currentActiveCard: null
}
//Khoi tao 1 Silce trong kho luu tru - Redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Noi xy ly du lieu dong bo
  reducers: {
    clearCurrentActiveCard : (state) => {
      state.currentActiveCard = null
    },
    updateCurrentActiveCard: (state, action) => {
      // action.payload la chuan dat ten nhan du lieu vao reducer, o day chung ta gan no ra 1 bien co nghia hon
      const Card = action.payload

      // Xử ly du lieu khi can thiet

      // Update lai du lieu cua currenActiveCard
      state.currentActiveCard = Card
    }
  },

  // ExtraReducers : Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchCardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      let card = action.payload

      // Xử ly du lieu khi can thiet

      // Update lai du lieu cua currenActiveCard
      state.currentActiveCard = card

    })

  }
})

// ation la noi dành cho các components bên dưới gọi bằng dispatch() tới nơi cập nhật lại dữ liệu thông qua reducer( chạy đồng bô)
// actions được tạo tự động
export const {
  updateCurrentActiveCard,
  clearCurrentActiveCard

} = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}
export const activeCardReducer = activeCardSlice.reducer