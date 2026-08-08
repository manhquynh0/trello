import {
  configureStore
} from '@reduxjs/toolkit'
import {
  activeBoardReducer
} from './activeBoard/activeBoardSlice'
import {
  userReducer
} from './user/userSlice'
import {
  combineReducers
} from '@reduxjs/toolkit'
import {
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định, cứ để mặc định
  storage: storage, // lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slice được duy trì qua mỗi lần f5
  //blacklist : ngược lại
}
// Combine các reducers trong dự án chúng ta ở đây
const rootReducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})
// thực hiện permist reducer
const persistedReducer = persistReducer(
  rootPersistConfig,
  rootReducers
)
export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false
  })
})