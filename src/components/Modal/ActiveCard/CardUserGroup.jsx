
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import Badge from '@mui/material/Badge'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useSelector } from 'react-redux'
import { usePopover } from '~/customHooks/usePopover'
function CardUserGroup({ cardMemberIds = [], onUpdateCardMember }) {
  /**
   * Xử lý Popover để ẩn hoặc hiện toàn bộ user trên một cái popup, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const { anchorPopoverElement, isOpenPopover, handleTogglePopover } = usePopover()
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined
  // Lấy board hiện tại để lấy ra toàn bộ thông tin các thành viên trong board
  const board = useSelector(selectCurrentActiveBoard)
  // Thành viên trong card sẽ là con của thànnh viên trong board
  const FE_CardMembers = board?.FE_allUser?.filter(user => cardMemberIds.includes(user._id))


  // Hàm handle Update CardMember
  const handleUpdateCardMember = (user) => {
    const incomingMemberInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id) ? 'REMOVE' : 'ADD'
    }



    // Gọi API update card member thông qua prop onUpdateCardMember
    onUpdateCardMember(incomingMemberInfo)
  }
  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {/* Hiển thị các user là thành viên của card */}
      {FE_CardMembers.map((user, index) =>
        <Tooltip title={user?.displayName} key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt={user?.displayName}
            src={user?.avatar}
          />
        </Tooltip>
      )}

      {/* Nút này để mở popover thêm member */}
      <Tooltip title="Thêm thành viên">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200],
            '&:hover': {
              color: (theme) => theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng Click chọn thêm vào card  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {board?.FE_allUser.map((user, index) =>
            <Tooltip title={user?.displayName} key={index}>
              {/* Cách làm Avatar kèm badge icon: https://mui.com/material-ui/react-avatar/#with-badge */}
              <Badge

                sx={{
                  cursor: 'pointer', '& .MuiBadge-badge': {
                    backgroundColor: 'transparent',
                    padding: 0,
                    minWidth: 'auto',
                    height: 'auto'
                  }
                }}
                overlap="rectangular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClick={() => handleUpdateCardMember(user)}
                badgeContent={cardMemberIds.includes(user._id) ? <CheckCircleIcon fontSize="small" sx={{ color: '#27ae60' }} /> : null}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
