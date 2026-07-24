
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import PanToolIcon from '@mui/icons-material/PanTool'
import Card from './Card'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

function BoardConetent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      height: (theme) => theme.boardContentHeight,
      // backgroundColor: 'rgba(144, 202, 249, 0.16)',
      padding: '10px',
      overflowX: 'auto',
      overflowY: 'hidden',
      p :'10px 0',
      gap: 2
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        '&::-webkit-scrollbar-track' : {
          m : 2
        }

      }}>

        <Box sx={{
          ml: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          height: 'fit-content'

        }} >
          {/* Header */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_HEADER_HEIGHT

          }}>
            <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <KeyboardArrowDownRoundedIcon id="basic-button-workspaces"
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu-workspaces' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick} />
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-workspaces'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ADD CARD</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove Column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* End Header */}

          {/* Main */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
          }}>
            <Card />
            <Card />
            <Card />
          </Box>
          {/* End Main */}

          {/* Footer */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_FOOTER_HEIGHT
          }}>
            <Button startIcon={<AddCardIcon />}>Add New Card </Button>
            <Tooltip title="Drag to Move" placement="top">
              <PanToolIcon />
            </Tooltip>
          </Box>
          {/* End Footer */}

        </Box>
        {/* End Card */}
        <Box sx={{
          ml: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          height: 'fit-content'

        }} >
          {/* Header */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_HEADER_HEIGHT

          }}>
            <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <KeyboardArrowDownRoundedIcon id="basic-button-workspaces"
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu-workspaces' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick} />
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-workspaces'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ADD CARD</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove Column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* End Header */}

          {/* Main */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
          }}>
            <Card />
            <Card />
            <Card />
          </Box>
          {/* End Main */}

          {/* Footer */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_FOOTER_HEIGHT
          }}>
            <Button startIcon={<AddCardIcon />}>Add New Card </Button>
            <Tooltip title="Drag to Move" placement="top">
              <PanToolIcon />
            </Tooltip>
          </Box>
          {/* End Footer */}

        </Box>
        {/* End Card */}
        <Box sx={{
          ml: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          height: 'fit-content'

        }} >
          {/* Header */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_HEADER_HEIGHT

          }}>
            <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <KeyboardArrowDownRoundedIcon id="basic-button-workspaces"
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu-workspaces' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick} />
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button-workspaces'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>ADD CARD</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove Column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* End Header */}

          {/* Main */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
          }}>
            <Card />
            <Card />
            <Card />
          </Box>
          {/* End Main */}

          {/* Footer */}
          <Box sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: COLUMN_FOOTER_HEIGHT
          }}>
            <Button startIcon={<AddCardIcon />}>Add New Card </Button>
            <Tooltip title="Drag to Move" placement="top">
              <PanToolIcon />
            </Tooltip>
          </Box>
          {/* End Footer */}

        </Box>
        {/* End Card */}
      </Box>
    </Box>
  )
}

export default BoardConetent