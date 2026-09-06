import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLocation, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isForgotPassword = location.pathname === '/forgot-password'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace='true' />
  }
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.9fr) minmax(420px, 1.1fr)' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: { xs: 0, md: 4 },
      px: { xs: 2, md: 6 },
      background: 'radial-gradient(circle at 12% 86%, rgba(117, 71, 255, .45), transparent 28%), radial-gradient(circle at 78% 12%, rgba(48, 110, 255, .22), transparent 25%), #06142D',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'

    }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', maxWidth: 510, minHeight: 650, p: 5, borderRadius: '18px', flexDirection: 'column', color: '#F6F8FF', border: '1px solid rgba(114, 157, 255, .34)', background: 'linear-gradient(160deg, rgba(32, 62, 141, .76), rgba(11, 27, 67, .94))', boxShadow: '0 24px 70px rgba(0, 5, 28, .42)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, fontSize: 30, fontWeight: 800 }}><Box sx={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: '10px', bgcolor: '#7357FF' }}><ViewKanbanOutlinedIcon /></Box>Qllo</Box>
        <Box sx={{ mt: 'auto', mb: 'auto' }}>
          <Typography sx={{ fontSize: 32, fontWeight: 800, mb: 1.5 }}>{isLogin ? 'Làm việc nhóm, thật dễ dàng.' : isRegister ? 'Tạo không gian làm việc của bạn.' : 'Lấy lại quyền truy cập của bạn.'}</Typography>
          <Typography sx={{ color: '#B8C9F2', lineHeight: 1.7 }}>Quản lý công việc, cộng tác với đội ngũ và biến mọi kế hoạch thành tiến độ rõ ràng.</Typography>
          <Box sx={{ mt: 4, p: 2.5, borderRadius: 3, bgcolor: 'rgba(92, 79, 243, .23)', border: '1px solid rgba(143, 132, 255, .35)' }}><AutoAwesomeIcon sx={{ color: '#A89AFF', mb: 1 }} /><Typography sx={{ fontWeight: 700 }}>Small steps, big progress.</Typography><Typography sx={{ color: '#B8C9F2', fontSize: 13, mt: .5 }}>Tập trung vào điều quan trọng nhất mỗi ngày.</Typography></Box>
        </Box>
        <Typography sx={{ color: '#91A7D7', fontSize: 13 }}>© 2026 Qllo · Không gian làm việc hiện đại</Typography>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 520 }}>{isLogin && <LoginForm />}{isRegister && <Register />}{isForgotPassword && <ForgotPassword />}</Box>
    </Box>
  )
}
export default Auth
