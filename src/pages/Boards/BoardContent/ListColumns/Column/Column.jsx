import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Tooltip from '@mui/material/Tooltip'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Button from '@mui/material/Button'
import ListCards from './ListCards/ListCards'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '60px'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import InputAdornment from '@mui/material/InputAdornment'
import QueueIcon from '@mui/icons-material/Queue'
import { toast } from 'react-toastify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { confirmDelete } from '~/utils/ConfirmDialog'
import { cloneDeep } from 'lodash'
import { createdNewCardAPI, deleteColumnApi } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
function Column({ column }) {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()
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
    try {
      const newBoard = cloneDeep(board)
      const newCard = {
        title: newCardTitle,
        columnId: column._id
      }
      const createdCard = await createdNewCardAPI({
        ...newCard,
        boardId: board?._id
      })
      const targetColumn = newBoard.columns.find(c => c._id === createdCard.columnId)
      if (
        targetColumn.cards.length === 1 &&
        targetColumn.cards[0].FE_PlaceholderCard
      ) {
        targetColumn.cards = []
        targetColumn.cardOrderIds = []
      }
      targetColumn.cards.push(createdCard)
      targetColumn.cardOrderIds.push(createdCard._id)
      toast.success('Created Successfully', {
        style: {
          borderRadius: '12px',
          background: '#16A34A',
          color: '#fff'
        },
        icon: () => (
          <span style={{ color: '#fff', fontSize: '20px' }}>✓</span>
        )
      })
      dispatch(updateCurrentActiveBoard(newBoard))
      toggleOpenNewCardForm()
      setNewCardTitle('')
    }
    catch (error) {
      toast.error(
        error.response?.data?.message || 'Create card failed!',
        {
          style: {
            borderRadius: '12px',
            background: '#DC2626',
            color: '#fff',
            fontWeight: 'bold'
          },
          icon: () => (
            <span style={{ color: '#fff', fontSize: '20px' }}>✕</span>
          )
        }
      )
    }
  }
  const deleteItem = async () => {
    handleClose()
    const result = await confirmDelete(
      'Are you sure you want to delete this column??'
    )

    if (result.isConfirmed) {
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(tagetColumn =>
        tagetColumn._id !== column._id
      )
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id =>
        id !== column._id
      )
      await deleteColumnApi(column._id)
      dispatch(updateCurrentActiveBoard(newBoard))
      toast.success('Deleted Successfully', {
        style: {
          borderRadius: '12px',
          background: '#16A34A',
          color: '#fff'
        },
        icon: () => (
          <span style={{ color: '#fff', fontSize: '20px' }}>✓</span>
        )
      })
    }

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
                <MoreHorizIcon
                  onClick={handleClick}
                  aria-label="show more"
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease',

                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      color: 'primary.main',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <ExpandMoreIcon />
                </MoreHorizIcon>
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

                <MenuItem onClick={deleteItem} sx={{
                  transition: 'all 0.2s',

                  '&:hover': {
                    color: 'error.main',
                    fontWeight: 700,
                    bgcolor: 'error.lighter',

                    '& .delete-item-icon': {
                      color: 'error.main'
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 700
                    }
                  }
                }}
                >
                  <ListItemIcon>
                    <DeleteRoundedIcon className='delete-item-icon' fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete Column</ListItemText>
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