import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import ListCards from './ListCards/ListCards'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '60px'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import InputAdornment from '@mui/material/InputAdornment'
import QueueIcon from '@mui/icons-material/Queue'
import { toast } from 'react-toastify'
const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expand'
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))
function Column({ column, createdNewCard }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openNewCardForm, setOpenNewCardFormmset] = React.useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardFormmset(!openNewCardForm)
  }
  const [newCardTitle, setNewCardTitle] = React.useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Title is Not Empty', {
        theme: 'colored'
      })
      return
    }
    const newCard = {
      title: newCardTitle,
      columnId: column._id
    }
    await createdNewCard(newCard)
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyles = {
    // touchAction : 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }
  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      <Box
        sx={{
          minWidth: '250px',
          maxWidth: '250px',
          ml: 2,
          borderRadius: '6px',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }} >
        {/* Header */}
        <Box {...listeners}
          sx={{
            p: 2,
            height: COLUMN_HEADER_HEIGHT + 24 // tăng chiều cao nếu cần
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {new Date().toLocaleDateString('vi-VN')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {column.title}
            </Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <ExpandMore
                  expand={open}
                  onClick={handleClick}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
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
        </Box>

        {/* End Header */}

        {/* Main */}
        <ListCards cards={column.cards} />
        {/* End Main */}

        {/* Footer */}
        <Box sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: COLUMN_FOOTER_HEIGHT
        }}>
          {!openNewCardForm
            ?
            <Button
              onClick={toggleOpenNewCardForm}
              startIcon={<QueueIcon sx={{ color: 'inherit' }} />}
              variant="contained"
              sx={{
                backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                '&:hover': {
                  backgroundColor: '#22C55E'// sáng hơn khi hover
                }
              }}
            >
              ADD NEW CARD
            </Button>

            :
            <Box sx={{
              overflow: 'unset',
              borderRadius: 2,
              width: '100%',
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer'


            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                width: '100%',
                gap: 1
              }}>
                <TextField
                  data-no-dnd="true"
                  size="small"
                  id="outlined-basic"
                  label="Enter Card Title"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CloseIcon
                          fontSize="small"
                          sx={{ cursor: 'pointer' }}
                          onClick={toggleOpenNewCardForm}
                        />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  size="small"
                  onClick={addNewCard}
                  startIcon={<QueueIcon sx={{ color: 'inherit' }} />}
                  variant="contained"
                  sx={{
                    flexShrink: 0,
                    backgroundColor: '#16A34A',
                    '&:hover': { backgroundColor: '#22C55E' }
                  }}
                >
                  ADD
                </Button>
              </Box>


            </Box>}

        </Box>
        {/* End Footer */}

      </Box >
    </div>

  )

}


export default Column