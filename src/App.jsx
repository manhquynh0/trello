import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Setting from '~/pages/settings/Settings'
import Boards from '~/pages/Boards'
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace='true' />
  }
  return <Outlet />

}
function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path='/' element={
        // replace : xóa ' / ' khỏi lịch sử trình duyệt
        <Navigate to='/boards/6a6db6b04a357c43f9e82a9f' replace={true} />
      } />
      {/* Nhung Route chi duoc truy cap sau khi login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:boardId' element={<Board />} />
        <Route path='/boards' element= {<Boards />} />

        <Route path='/settings/account' element={<Setting />} />
        <Route path='/settings/security' element={<Setting />} />
      </Route>
      {/* 404 */}

      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
