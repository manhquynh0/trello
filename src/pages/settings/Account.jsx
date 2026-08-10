/* eslint-disable no-console */
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import BadgeIcon from '@mui/icons-material/Badge'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { FILED_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { updateUserApi } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { singleFileValidator } from '~/utils/validators'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Account = () => {
  const currentUser = useSelector(selectCurrentUser)
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })

  const [isLoading, setIsLoading] = useState(false)
  const uploadFileAvatar = async (e) => {
    const file = e.target?.files[0]
    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      e.target.value = '' // reset input để chọn lại cùng file vẫn trigger onChange
      return
    }

    setIsLoading(true)
    const reqData = new FormData()
    reqData.append('avatar', file)

    try {
      const res = await toast.promise(dispatch(updateUserApi(reqData)), {
        pending: 'Đang cập nhật...'
      })
      if (!res.error) toast.success('Cập nhật thành công')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Cập nhật avatar thất bại')
    } finally {
      setIsLoading(false)
      e.target.value = ''
    }
  }
  const onSubmit = async (data) => {
    setIsLoading(true)
    const { displayName } = data
    console.log(displayName)

    try {
      if (displayName === currentUser?.displayName) {
        toast.error('Tên hiển thị mới không được trùng với tên cũ')
        return
      }

      await toast.promise(dispatch(updateUserApi({ displayName })), {
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
            borderRadius: 4,
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            backgroundColor: '#1A2540',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Profile Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.displayName}
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                fontSize: '2rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              {currentUser?.displayName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Typography
              variant='h6'
              sx={{
                color: '#F8FAFC',
                fontWeight: 600,
                mb: 0.5
              }}
            >
              {currentUser?.displayName}
            </Typography>

            <Typography
              variant='body2'
              sx={{
                color: '#CBD5E1',
                mb: 2
              }}
            >
              {currentUser?.userName}
            </Typography>

            {/* Upload Button */}
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Button
                disabled={isLoading}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
                    Đang cập nhật...
                  </Box>
                ) : (
                  'Cập nhật Avatar'
                )}

                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={uploadFileAvatar}
                />
              </Button>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Email Field */}
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
                Email
              </Typography>
              <TextField
                disabled
                fullWidth
                name='email'
                value={currentUser?.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ mr: 0.5, color: '#3B82F6' }}>
                      <EmailIcon />
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
                  }
                }}
              />
            </Box>

            {/* Username Field */}
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
                Tên đăng nhập
              </Typography>
              <TextField
                disabled
                fullWidth
                name='username'
                value={currentUser?.userName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ mr: 0.5, color: '#3B82F6' }}>
                      <PersonIcon />
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
                  }
                }}
              />
            </Box>

            {/* Display Name Field */}
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
                Tên hiển thị
              </Typography>
              <TextField
                fullWidth
                name='displayName'
                //   value={formData.displayName}
                //   onChange={handleInputChange}
                {...register('displayName', {
                  required: FILED_REQUIRED_MESSAGE
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ mr: 0.5, color: '#3B82F6' }}>
                      <BadgeIcon />
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
                  }
                }}
              />
              <FieldErrorAlert errors={errors} fieldName='displayName' />
            </Box>
          </Box>

          {/* Update Button */}
          <Button
            fullWidth
            type='submit'
            variant='contained'
            disabled={isLoading}
            sx={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              color: '#FFFFFF',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              position: 'relative',
              '&:hover:not(:disabled)': {
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
                transform: 'translateY(-2px)'
              },
              '&:disabled': {
                background: 'rgba(59, 130, 246, 0.5)',
                color: '#CBD5E1'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
                Đang cập nhật...
              </Box>
            ) : (
              'Cập nhật thông tin'
            )}
          </Button>
        </Card>
      </Box>
    </form>
  )
}

export default Account