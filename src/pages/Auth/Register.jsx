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
            minHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2
          }}
        >
          <Paper
            elevation={8}
            sx={{
              width: '100%',
              maxWidth: 500,
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                textAlign: 'center'
              }}
            >
              <Typography variant="h5">
                Đăng ký
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Tạo tài khoản mới để bắt đầu.
              </Typography>

            </Box>

            <Box sx={{ p: 3 }}>

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
                sx={{ mt: 3 }}
              >
                Đăng ký
              </Button>
            </Box>

            <Box
              sx={{
                p: 3,
                borderTop: 1,
                borderColor: 'divider',
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