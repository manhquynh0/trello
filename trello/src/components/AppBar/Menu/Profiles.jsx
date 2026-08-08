import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { confirm } from '~/utils/ConfirmDialog'
import { selectCurrentUser, logoutUserApi } from '~/redux/user/userSlice'

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const handleLogout = async () => {
    const result = await confirm('Bạn có chắc muốn đăng xuất?', 'Đăng xuất')
    if (result.isConfirmed) {
      dispatch(logoutUserApi())
    }
  }
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ padding: 0 }}
            aria-controls={open ? 'basic-menu-profiles' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={currentUser?.avatar} sx={{ width: 30, height: 30 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="basic-menu-profiles"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 240,
            overflow: 'visible',
            mt: 1.5,

            backgroundColor: '#1e293b',
            color: '#fff',

            '& .MuiMenuItem-root': {
              color: '#fff',
              borderRadius: '6px',
              margin: '4px 6px',

              '&:hover': {
                backgroundColor: '#334155'
              },

              '&.Mui-focusVisible': {
                backgroundColor: '#334155'
              }
            },

            '& .MuiDivider-root': {
              borderColor: 'rgba(255,255,255,0.2)'
            },

            '& .MuiListItemIcon-root': {
              color: '#fff'
            },

            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: '#1e293b',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            borderRadius: 1,
            mx: 0.5,

            '&:hover': {
              backgroundColor: '#334155'
            }
          }}
        >
          <Avatar
            src={currentUser?.avatar}
            sx={{ mr: 2 }}
          />
          Profile
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleClose}
          sx={{
            borderRadius: 1,
            mx: 0.5,

            '&:hover': {
              backgroundColor: '#334155'
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          onClose={handleClose}
          sx={{
            borderRadius: 1,
            mx: 0.5,

            '&:hover': {
              backgroundColor: '#7f1d1d',
              color: '#fff',

              '& .MuiListItemIcon-root': {
                color: '#fff'
              }
            }
          }}
        >
          <ListItemIcon sx={{ color: '#fff' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
