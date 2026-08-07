import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import FieldErrorAlert, { } from '~/components/Form/FieldErrorAlert'
import {
  useSearchParams
} from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  loginUserApi
} from '~/redux/user/userSlice'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, FILED_REQUIRED_MESSAGE } from '~/utils/validators'
import Alert from '@mui/material/Alert'
import { useDispatch } from 'react-redux'
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [sreachParams] = useSearchParams()
  const registeredEmail = sreachParams.get('registeredEmail')
  const verifiedEmail = sreachParams.get('verifiedEmail')
  const onSubmit = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserApi({ email, password })),
      {
        pending: 'Đang đăng nhập...',
        success: 'Đăng nhập thành công!',
        error: 'Đăng nhập thất bại!'
      },
      {
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff'
        }
      }
    ).then((res) => {
      if (!res.error) navigate('/')
    })
  }
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
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
              maxWidth: 420,
              p: 0,
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <Typography variant='h5' component='h1'>
                Đăng nhập
              </Typography>
              <Typography variant='body2' sx={{ mt: 1 }}>
                Nhập thông tin để truy cập tài khoản của bạn.
              </Typography>
              {registeredEmail && <Alert
                severity="info"
                variant="filled"
                sx={{
                  mt: 1,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(33, 150, 243, 0.18)',
                  color: '#E3F2FD',
                  border: '1px solid rgba(33,150,243,.4)',
                  '& .MuiAlert-icon': {
                    color: 'yellow'
                  },
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                Sau khi đăng ký thành công, hệ thống sẽ gửi email xác thực tài khoản{' '}
                <strong>{registeredEmail}</strong>. Vui lòng kiểm tra hộp thư của bạn.
              </Alert>}
              {verifiedEmail && <Alert
                severity="success"
                variant="filled"
                sx={{
                  mt: 1,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(76, 175, 80, 0.18)',
                  color: '#E8F5E9',
                  border: '1px solid rgba(76,175,80,.4)',
                  '& .MuiAlert-icon': {
                    color: '#66BB6A'
                  },
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                Xác thực tài khoản <strong>{verifiedEmail}</strong> thành công. Hãy đăng nhập
                để trải nghiệm ngay nhé!
              </Alert>}

            </Box>

            <Box sx={{ p: 3 }}>
              <TextField
                id='email'
                variant='outlined'
                fullWidth
                margin='normal'
                label='Email'
                type='email'
                required
                autoComplete='email'
                helperText={errors.confirmPassword?.message}
                {...register('email', {
                  required: FILED_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-focused': {
                      color: '#90caf9'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}

              />
              <FieldErrorAlert errors={errors} fieldName='email' />
              <TextField
                id='password'
                variant='outlined'
                fullWidth
                label='Mật khẩu'
                type={showPassword ? 'text' : 'password'}
                helperText={errors.confirmPassword?.message}
                {...register('password', {
                  required: FILED_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-focused': {
                      color: '#90caf9'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}

              />

              <FieldErrorAlert errors={errors} fieldName='password' />

              <Button
                className='interceptor-loading'
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                sx={{ mt: 3 }}
                type='submit'
              >
                Đăng nhập
              </Button>
            </Box>

            <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
              <Typography variant='body2' color='text.secondary'>
                Chưa có tài khoản?{' '}
                <Link to='/register' style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
                  Đăng ký ngay
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Zoom>
    </form>
  )
}

export default LoginForm