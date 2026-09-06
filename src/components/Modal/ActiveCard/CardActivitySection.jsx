import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function CardActivitySection({ comments = [], onUpdateComment }) {
  const currentUser = useSelector(selectCurrentUser)

  const handleAddCardComment = (event) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      const content = event.target?.value.trim()
      if (!content) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content
      }
      onUpdateComment(commentToAdd)
      event.target.value =''
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer', border: '2px solid #2D568E' }}
          alt="trungquandev"
          src={currentUser?.avatar}
        />
        <TextField
          fullWidth
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
          sx={{ '& .MuiOutlinedInput-root': { color: '#D5E3FF', bgcolor: 'rgba(16, 42, 83, 0.45)', borderRadius: '9px', '& fieldset': { borderColor: '#244879' }, '&:hover fieldset': { borderColor: '#3B68A8' } }, '& textarea::placeholder': { color: '#829BC7', opacity: 1 } }}
        />
      </Box>

      {/* Hiển thị danh sách các comments */}
      {comments.length === 0 &&
        <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>No activity found!</Typography>
      }
      {comments.map((user, index) =>
        <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
          <Tooltip title={ user?.userDisplayName}>
            <Avatar
              sx={{ width: 32, height: 32, cursor: 'pointer', border: '1px solid #2D568E' }}
              alt ={ user?.userDisplayName}
              src={user?.userAvatar}
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              {user?.userDisplayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px' }}>
              {moment().format('llll')}
            </Typography>

            <Box sx={{
              display: 'block',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(16, 42, 83, 0.68)' : 'white',
              color: (theme) => theme.palette.mode === 'dark' ? '#D5E3FF' : 'inherit',
              p: '10px 12px',
              mt: '4px',
              border: '1px solid #244879',
              borderRadius: '8px',
              wordBreak: 'break-word',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
            }}>
              {user?.content}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardActivitySection
