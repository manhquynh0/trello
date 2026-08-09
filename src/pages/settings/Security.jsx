import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LockIcon from '@mui/icons-material/Lock'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PasswordIcon from '@mui/icons-material/Password'
import ShieldIcon from '@mui/icons-material/Shield'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import { updateUserApi } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import {
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  FILED_REQUIRED_MESSAGE
} from '~/utils/validators'
const Security = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const password = watch('newPassword')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    setIsLoading(true)
    const { password, newPassword } = data

    try {
      await toast.promise(dispatch(updateUserApi({ password, newPassword })), {
        pending: 'Đang cập nhật...'
      }).then(res => {
        if (!res.error) {
          toast.success('Cập nhật thành công')
        }
      })

    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
        <Card
          sx={{
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            backgroundColor: '#1A2540',
            borderRadius: 4,
            border: '1px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <LockIcon sx={{ color: '#3B82F6', fontSize: '1.8rem' }} />
              <Typography
                variant='h6'
                sx={{
                  color: '#F8FAFC',
                  fontWeight: 700
                }}
              >
                Bảo mật tài khoản
              </Typography>
            </Box>
            <Typography
              variant='body2'
              sx={{
                color: '#CBD5E1',
                ml: 4.5
              }}
            >
              Quản lý mật khẩu và cài đặt bảo mật
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.1)', mb: 4 }} />

          {/* Change Password Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <VpnKeyIcon sx={{ color: '#EC4899' }} />
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#F8FAFC',
                  fontWeight: 600
                }}
              >
                Đổi mật khẩu
              </Typography>
            </Box>

            <Stack spacing={2.5} sx={{ pl: 0 }}>
              {/* Current Password */}
              <Box>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#CBD5E1',
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }}
                >
                  Mật khẩu hiện tại
                </Typography>
                <TextField
                  fullWidth

                  name='currentPassword'
                  type={showPassword ? 'text' : 'password'}
                  // value={passwords.currentPassword}
                  placeholder='Nhập mật khẩu hiện tại'
                  {...register('password', {
                    required: FILED_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start' sx={{ mr: 0.5, color: '#EC4899' }}>
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#F8FAFC',
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(59, 130, 246, 0.4)',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)'
                      },
                      '&.Mui-focused': {
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '12px 14px',
                      fontSize: '0.95rem'
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#64748B',
                      opacity: 1
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName='password' />
              </Box>

              {/* New Password */}
              <Box>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#CBD5E1',
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }}
                >
                  Mật khẩu mới
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name='newPassword'
                  placeholder='Nhập mật khẩu mới'
                  {...register('newPassword', {
                    required: FILED_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start' sx={{ mr: 0.5, color: '#EC4899' }}>
                        <PasswordIcon fontSize='small' />
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#F8FAFC',
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(59, 130, 246, 0.4)',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)'
                      },
                      '&.Mui-focused': {
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '12px 14px',
                      fontSize: '0.95rem'
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#64748B',
                      opacity: 1
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName='newPassword' />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#CBD5E1',
                    mb: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }}
                >
                  Xác nhận mật khẩu mới
                </Typography>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='Xác nhận mật khẩu mới'
                  {...register('confirmNewPassword', {
                    required: FILED_REQUIRED_MESSAGE,
                    validate: value =>
                      value === password || 'Mật khẩu xác nhận không khớp',
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start' sx={{ mr: 0.5, color: '#EC4899' }}>
                        <ShieldIcon fontSize='small' />
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#F8FAFC',
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(59, 130, 246, 0.4)',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)'
                      },
                      '&.Mui-focused': {
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '12px 14px',
                      fontSize: '0.95rem'
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#64748B',
                      opacity: 1
                    }
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName='confirmNewPassword' />
              </Box>
            </Stack>

            {/* Change Password Button */}
            <Button
              fullWidth
              disabled={isLoading}
              variant='contained'
              type='submit'
              sx={{
                mt: 3,
                background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                color: '#FFFFFF',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
                  boxShadow: '0 8px 16px rgba(236, 72, 153, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: 'pink' }} />
                  Đang cập nhật...
                </Box>
              ) : (
                'Đổi mật khẩu'
              )}
            </Button>
          </Box>

          {/* Security Tips */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <Typography
              variant='subtitle2'
              sx={{
                color: '#F8FAFC',
                fontWeight: 600,
                mb: 1.5
              }}
            >
              💡 Lời khuyên bảo mật
            </Typography>
            <Stack spacing={1.2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                <Typography variant='body2'>Sử dụng mật khẩu mạnh tối thiểu 8 ký tự.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#EC4899' }} />
                <Typography variant='body2'>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                <Typography variant='body2'>Tránh dùng thông tin cá nhân dễ đoán.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#CBD5E1' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#EC4899' }} />
                <Typography variant='body2'>Thay đổi mật khẩu định kỳ mỗi 3–6 tháng.</Typography>
              </Box>
            </Stack>
          </Box>
        </Card>
      </Box>
    </form>
  )
}

export default Security