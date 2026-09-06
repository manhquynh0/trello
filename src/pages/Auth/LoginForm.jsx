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
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  useSearchParams
} from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  loginUserApi
} from '~/redux/user/userSlice'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, FILED_REQUIRED_MESSAGE } from '~/utils/validators'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import GoogleIcon from '@mui/icons-material/Google'
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
        pending: 'Logging in...'
      },
      {
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff'
        }
      }
    ).then((res) => {
      if (!res.error) {

        navigate('/')
        toast.success(`Chào mừng ${email} đến với QLLO`)
      }

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
            <Box sx={{ pb: 2.5, color: '#F4F7FF' }}>
              <Typography variant='h4' component='h1' sx={{ fontWeight: 800 }}>
                Đăng nhập
              </Typography>
              <Typography variant='body2' sx={{ mt: 1, color: '#B8C9F2' }}>
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

            <Box>
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
                    color: 'black',
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
                sx={{ '& .MuiInputLabel-root': { color: '#AFC2EA' }, '& .MuiInputBase-input': { color: '#F4F7FF' }, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#0E2A59', '& fieldset': { borderColor: '#315B98' } } }}

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
                    color: 'black',
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
                sx={{ mt: 2, '& .MuiInputLabel-root': { color: '#AFC2EA' }, '& .MuiInputBase-input': { color: '#F4F7FF' }, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#0E2A59', '& fieldset': { borderColor: '#315B98' } } }}

              />

              <FieldErrorAlert errors={errors} fieldName='password' />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link to='/forgot-password' style={{ color: '#B9AFFF', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Quên mật khẩu?</Link>
              </Box>

              <Button
                className='interceptor-loading'
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                sx={{ mt: 3, py: 1, borderRadius: '10px', fontWeight: 800, background: 'linear-gradient(90deg, #7259FF, #397BFF)' }}
                type='submit'
              >
                Đăng nhập
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, my: 2.5 }}>
                <Divider sx={{ flex: 1, borderColor: '#244879' }} />
                <Typography sx={{ color: '#91A7D7', fontSize: 12 }}>Hoặc</Typography>
                <Divider sx={{ flex: 1, borderColor: '#244879' }} />
              </Box>
              <Button type="button" fullWidth variant="outlined" startIcon={<GoogleIcon />}
                sx={{ py: 1.1, borderRadius: '10px', color: '#F4F7FF', borderColor: '#315B98', fontWeight: 700, textTransform: 'none', '&:hover': { borderColor: '#5B8DDB', bgcolor: 'rgba(46, 91, 166, .20)' }, '& .MuiButton-startIcon': { color: '#EA4335' } }}>
                Đăng nhập với Google
              </Button>
            </Box>

            <Box sx={{ pt: 3, textAlign: 'center' }}>
              <Typography variant='body2' sx={{ color: '#AFC2EA' }}>
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
