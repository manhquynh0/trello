import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import Register from './Register'
const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'url("src/assets/auth.gif")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'

    }}>
      {isLogin && <LoginForm />}
      {isRegister && <Register />}
    </Box>
  )
}
export default Auth