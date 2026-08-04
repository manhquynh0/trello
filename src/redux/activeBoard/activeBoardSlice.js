import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
// Khoi tao gia tri State cua 1 Slice trong Redux
import {
  isEmpty
} from 'lodash'
import {
  generatePlaceholderCard
} from '~/utils/PlaceHolderCard'
import {
  mapOrder
} from '~/utils/sort'
import axios from 'axios'
import {
  API_ROOT
} from '~/utils/constants'
//Các hành động gọi Api bất đồng bộ cập nhật dữ liệu vảo redux, dùng middleware createAsync Thunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk('activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)
const initialState = {
  currentActiveBoard: null
}
//Khoi tao 1 Silce trong kho luu tru - Redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Noi xy ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload la chuan dat ten nhan du lieu vao reducer, o day chung ta gan no ra 1 bien co nghia hon
      const board = action.payload

      // Xử ly du lieu khi can thiet

      // Update lai du lieu cua currenActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducers : Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      let board = action.payload

      // Xử ly du lieu khi can thiet
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {

          const placeholderCard = generatePlaceholderCard(column)
          column.cards = [placeholderCard]
          column.cardOrderIds = [placeholderCard._id]

        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      // Update lai du lieu cua currenActiveBoard
      state.currentActiveBoard = board

    })

  }
})

// ation la noi dành cho các components bên dưới gọi bằng dispatch() tới nơi cập nhật lại dữ liệu thông qua reducer( chạy đồng bô)
// actions được tạo tự động
export const {
  updateCurrentActiveBoard
} = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}
export const activeBoardReducer = activeBoardSlice.reducer