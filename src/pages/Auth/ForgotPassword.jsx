import { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FILED_REQUIRED_MESSAGE } from '~/utils/validators'

function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  // UI-only handler: thay bằng API reset password khi backend sẵn sàng.
  const onSubmit = () => setSent(true)

  return (
    <Box sx={{ minHeight: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
      <Paper elevation={8} sx={{ width: '100%', p: { xs: 3, sm: 4.5 }, borderRadius: '18px', bgcolor: '#0B2045', color: '#F4F7FF', border: '1px solid rgba(99, 148, 240, .40)', boxShadow: '0 24px 70px rgba(0, 5, 28, .45)' }}>
        <Link to="/login" style={{ color: '#B9CCF3', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, marginBottom: 30 }}><ArrowBackIcon fontSize="small" />Quay lại đăng nhập</Link>
        {sent ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', mx: 'auto', mb: 2, bgcolor: 'rgba(66, 220, 154, .18)', color: '#55E4A0' }}><MarkEmailReadOutlinedIcon sx={{ fontSize: 34 }} /></Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.25 }}>Kiểm tra email của bạn</Typography>
            <Typography sx={{ color: '#B8C9F2', lineHeight: 1.7, mb: 3 }}>Nếu email tồn tại, liên kết đặt lại mật khẩu sẽ được gửi đến <strong>{getValues('email')}</strong>.</Typography>
            <Button component={Link} to="/login" fullWidth variant="contained" sx={{ py: 1.2, borderRadius: '10px', fontWeight: 800, background: 'linear-gradient(90deg, #7259FF, #397BFF)' }}>Quay lại đăng nhập</Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: '14px', mb: 2.5, bgcolor: 'rgba(112, 87, 255, .22)', color: '#B9AFFF' }}><LockResetOutlinedIcon /></Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Quên mật khẩu?</Typography>
            <Typography sx={{ color: '#B8C9F2', lineHeight: 1.7, mb: 3 }}>Nhập email tài khoản. Chúng tôi sẽ gửi liên kết để bạn đặt lại mật khẩu.</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1, color: '#DCE8FF' }}>Email</Typography>
            <TextField fullWidth placeholder="Nhập email của bạn" error={!!errors.email} helperText={errors.email?.message} {...register('email', { required: FILED_REQUIRED_MESSAGE, pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE } })} InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: '#9CB8EC' }} /></InputAdornment> }} sx={{ '& .MuiInputBase-input': { color: '#F4F7FF' }, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#0E2A59', '& fieldset': { borderColor: '#315B98' }, '&:hover fieldset': { borderColor: '#5483C5' } }, '& input::placeholder': { color: '#829BC7', opacity: 1 }, '& .MuiFormHelperText-root': { color: '#FF9DBE' } }} />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, py: 1.2, borderRadius: '10px', fontWeight: 800, background: 'linear-gradient(90deg, #7259FF, #397BFF)' }}>Gửi liên kết đặt lại</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, my: 2.5, color: '#6E88B6', fontSize: 12 }}><Box sx={{ height: 1, flex: 1, bgcolor: '#244879' }} />Hoặc<Box sx={{ height: 1, flex: 1, bgcolor: '#244879' }} /></Box>
            <Button component={Link} to="/login" fullWidth variant="outlined" sx={{ py: 1.05, borderRadius: '10px', color: '#C4D7FF', borderColor: '#315B98' }}>Quay lại đăng nhập</Button>
          </form>
        )}
      </Paper>
    </Box>
  )
}

export default ForgotPassword
