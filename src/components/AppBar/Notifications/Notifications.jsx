import { useState, useEffect } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useDispatch, useSelector } from 'react-redux'
import { socketIoInstance } from '~/main'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { fetchNotificationsAPI, selectCurrentNotifications, updateBoardInvitationAPI, addCurrentnotifications } from '~/redux/notifications/notificationsSlice'
const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const notifications = useSelector(selectCurrentNotifications)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [newNotification, setNewNotification] = useState(null) // kiểm tra có thông báo mới
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(fetchNotificationsAPI())
    // tạo 1 func xử lý khi nhận được sự kiện realtime
    const onRecevieNewInvation = (invitation) => {
      // Nếu như user đang đăng nhập hiện tại mà chúng ta đang lưu trong redux chính là invitee( người được mời) trong bản ghi invitation
      if (invitation.inviteeId === currentUser._id) {
        // Thêm bản ghi invitation mới vào redux
        dispatch(addCurrentnotifications(invitation))

        // cập nhật trạng thái
        setNewNotification(true)
      }
    }

    // Lắng nghe một sự kiện realtime có tên là BE_USER_INVITED_TO_BOARD từ server gửi về
    socketIoInstance.on('BE_USER_INVITED_TO_BOARD', onRecevieNewInvation)

    //CleanUp sự kiện để ngăn chặn bị lặp lại event
    return () => {
      socketIoInstance.off('BE_USER_INVITED_TO_BOARD', onRecevieNewInvation)
    }
  }, [dispatch, currentUser._id])
  const updateBoardInvitation = (notificationId, status) => {
    dispatch(updateBoardInvitationAPI({ notificationId, status })).then((res) => {
      if (res.payload?.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`)
      }
    })
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          // variant="none"
          // variant="dot"
          variant={newNotification ? 'dot' : 'none'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            // color: 'white'
            color: newNotification ? 'yellow' : 'white'
          }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications.length === 0) && <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>}
        {notifications?.map((notification, index) => {
          const boardInvitation = notification?.boardInvitation || {}
          const inviter = boardInvitation?.inviter || notification?.inviter
          const inviterName = inviter?.displayName || 'Someone'
          const boardTitle = notification?.board?.title

          return (
            <Box key={index}>
              <MenuItem sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}>
                <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Nội dung của thông báo */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box><GroupAddIcon fontSize="small" /></Box>
                    <Box><strong>{inviterName}</strong> had invited you to join the board <strong>{boardTitle}</strong></Box>
                  </Box>

                  {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                  {boardInvitation?.status === BOARD_INVITATION_STATUS.PENDING &&
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => updateBoardInvitation(notification?._id, BOARD_INVITATION_STATUS.ACCEPTED)}
                      >
                        Accept
                      </Button>
                      <Button
                        className="interceptor-loading"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => updateBoardInvitation(notification?._id, BOARD_INVITATION_STATUS.REJECTED)}
                      >
                        Reject
                      </Button>
                    </Box>
                  }
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}
                    {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED &&

                      <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                    }
                    {notification?.boardInvitation?.status === BOARD_INVITATION_STATUS.REJECTED &&
                      <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                    }
                  </Box>


                  {/* Thời gian của thông báo */}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="span" sx={{ fontSize: '13px' }}>
                      {moment(notification?.createdAt).format('llll')}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
              {index !== (notifications?.length - 1) && <Divider />}
            </Box>
          )
        })}
      </Menu>
    </Box>
  )
}

export default Notifications
