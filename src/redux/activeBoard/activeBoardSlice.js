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
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import {
  API_ROOT
} from '~/utils/constants'
//Các hành động gọi Api bất đồng bộ cập nhật dữ liệu vảo redux, dùng middleware createAsync Thunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk('activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)
export const fetchBoardsAPI = createAsyncThunk('activeBoard/fetchBoardsApi',
  async (search) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${search}`)
    return response.data
  }
)
const initialState = {
  currentActiveBoard: null,
  boards: [],
  boardsTotalMetadata: {
    totalBoards: 0,
    totalFavoriteBoards: 0,
    totalPublicBoards: 0,
    totalPrivateBoards: 0
  }
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
    },
    updateCardInCurrentActiveBoard: (state, action) => {
      const updateCard = action.payload

      // Tìm column chứa card và cập nhật card trong column đó
      const columnToUpdate = state.currentActiveBoard.columns.find(column => column._id === updateCard.columnId)
      if (columnToUpdate) {
        const cardIndex = columnToUpdate.cards.findIndex(card => card._id === updateCard._id)
        if (cardIndex !== -1) {
          columnToUpdate.cards[cardIndex] = updateCard
        }
      }
    },
    updateBoards: (state, action) => {
      const boards = action.payload
      state.boards = boards
    }
  },
  // ExtraReducers : Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      let board = action.payload

      // Thành viên trong board sẽ là gộp lại của member và owner
      board.FE_allUser = board.owners.concat(board.members)

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
    builder.addCase(fetchBoardsAPI.fulfilled, (state, action) => {
      // API trả về object dạng: { boards: [...], totalBoards: ... }
      const resData = action.payload

      // Gán mảng boards từ resData.boards thay vì gán nguyên object
      state.boards = resData?.boards || []
      state.boardsTotalMetadata = {
        totalBoards: resData?.totalBoards || 0,
        totalFavoriteBoards: resData?.totalFavoriteBoards || 0,
        totalPublicBoards: resData?.totalPublicBoards || 0,
        totalPrivateBoards: resData?.totalPrivateBoards || 0
      }

    })

  }
})

// ation la noi dành cho các components bên dưới gọi bằng dispatch() tới nơi cập nhật lại dữ liệu thông qua reducer( chạy đồng bô)
// actions được tạo tự động
export const {
  updateCurrentActiveBoard,
  updateCardInCurrentActiveBoard,
  updateBoards
} = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}
export const selectCurrentBoards = (state) => {
  return state.activeBoard.boards
}
export const selectBoardsTotalMetadata = (state) => {
  return state.activeBoard.boardsTotalMetadata
}
export const activeBoardReducer = activeBoardSlice.reducer