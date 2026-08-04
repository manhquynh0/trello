import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from '~/pages/Auth'
function App() {
  return (
    <Routes>
      <Route path='/' element={
        // replace : xóa ' / ' khỏi lịch sử trình duyệt
        <Navigate to='/boards/6a6db6b04a357c43f9e82a9f' replace={true} />
      } />
      <Route path='/boards/:boardId' element={<Board />} />
      {/* 404 */}

      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
