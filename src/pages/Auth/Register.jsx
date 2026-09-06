import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Zoom from '@mui/material/Zoom'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  registerAPI
} from '~/apis'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  FILED_REQUIRED_MESSAGE
} from '~/utils/validators'
const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()
  const onSubmit = (data) => {
    const { email, password } = data
    toast.promise(
      registerAPI({ email, password }),
      {
        pending: 'Registation is in progress...'
      }
    ).then(user => navigate(`/login?registeredEmail=${user.email}`))
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const password = watch('password')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Zoom in>
        <Box
          sx={{
            minHeight: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 0
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: '100%',
              maxWidth: 'none',
              p: { xs: 3, sm: 4.5 },
              borderRadius: '18px',
              overflow: 'hidden',
              bgcolor: '#0B2045',
              color: '#F4F7FF',
              border: '1px solid rgba(99, 148, 240, .40)',
              boxShadow: '0 24px 70px rgba(0, 5, 28, .45)'
            }}
          >
            <Box
              sx={{
                pb: 2.5,
                color: '#F4F7FF'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Đăng ký
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: '#B8C9F2' }}>
                Tạo tài khoản mới để bắt đầu.
              </Typography>

            </Box>

            <Box sx={{ '& .MuiInputLabel-root': { color: '#AFC2EA' }, '& .MuiInputBase-input': { color: '#F4F7FF' }, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#0E2A59', '& fieldset': { borderColor: '#315B98' } } }}>

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: FILED_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password', {
                  required: FILED_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Nhập lại mật khẩu"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: FILED_REQUIRED_MESSAGE,
                  validate: value =>
                    value === password || 'Mật khẩu xác nhận không khớp'
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                className='interceptor-loading'
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, py: 1, borderRadius: '10px', fontWeight: 800, background: 'linear-gradient(90deg, #7259FF, #397BFF)' }}
              >
                Đăng ký
              </Button>
            </Box>

            <Box
              sx={{
                pt: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="body2">
                Đã có tài khoản?{' '}
                <Link to='/login' style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
                  Đăng nhập ngay
                </Link>
              </Typography>
            </Box>

          </Paper>
        </Box>
      </Zoom>
    </form>
  )
}

export default RegisterForm
