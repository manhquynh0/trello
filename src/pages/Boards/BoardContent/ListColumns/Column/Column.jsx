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
const COLUMN_HEADER_HEIGHT = '48px'
const COLUMN_FOOTER_HEIGHT = '48px'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import InputAdornment from '@mui/material/InputAdornment'
import QueueIcon from '@mui/icons-material/Queue'
import { toast } from 'react-toastify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { confirm } from '~/utils/ConfirmDialog'
import { cloneDeep } from 'lodash'
import { createdNewCardAPI, deleteColumnApi, updateColumnDetaislApi } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { usePermission } from '~/customHooks/usePermission'
import { permission } from '~/config/rabcConfig'
import { selectCurrentUser } from '~/redux/user/userSlice'
function Column({ column }) {
  const board = useSelector(selectCurrentActiveBoard)
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const { hasPermission } = usePermission({ board, user })

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openNewCardForm, setOpenNewCardFormmset] = React.useState(false)
  const toggleOpenNewCardForm = () => {
    setOpenNewCardFormmset(!openNewCardForm)
  }
  const [newCardTitle, setNewCardTitle] = React.useState('')
  const addNewCard = async () => {
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

  const deleteItem = async () => {
    handleClose()
    const result = await confirm(
      'Bạn có chắc muốn xóa cột này?', 'Xóa'
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
  const onUpdateColumnTitle = (newTitle) => {
    updateColumnDetaislApi(column._id, {
      title: newTitle
    }).then(() => {
      const newBoard = cloneDeep(board)
      newBoard.columns = newBoard.columns.map(c => {
        if (c._id !== column._id) return c
        return {
          ...c,
          title: newTitle
        }
      })
      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }
  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      <Box
        sx={{
          minWidth: '282px',
          maxWidth: '282px',
          ml: 1,
          borderRadius: '10px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0B1B3B' : '#FFFFFF',
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid #18376B' : '1px solid #D5E1F2',
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 12px 28px rgba(2, 12, 35, 0.28)' : '0 8px 22px rgba(38, 72, 125, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }} >
        {/* Header */}
        <Box {...listeners}
          sx={{
            px: 1.5,
            py: 1,
            maxHeight: COLUMN_HEADER_HEIGHT,
            height: COLUMN_HEADER_HEIGHT + 24 // tăng chiều cao nếu cần
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* <Typography variant='h6' sx={{
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {column.title}
            </Typography> */}
            <ToggleFocusInput
              value={column.title}
              onChangedValue={onUpdateColumnTitle}
              data-no-dnd='true'
              inputFontSize="14px"
              sx={{ '& input': { color: '#F2F6FF', fontWeight: 700 }, '& .MuiOutlinedInput-root': { minHeight: 30 } }}

            />
            <Typography sx={{ color: '#8EA6D8', fontSize: 12, mx: 1 }}>{column.cards?.filter(card => !card.FE_PlaceholderCard).length || 0}</Typography>
            <Box>
              <Tooltip title="More" placement="top">
                <MoreHorizIcon
                  onClick={handleClick}
                  aria-label="show more"
                  sx={{
                    cursor: 'pointer',
                    color: (theme) => theme.palette.mode === 'dark' ? '#A9BCE5' : '#526782',
                    fontSize: '20px',
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

                {hasPermission(permission.DELETE_COLUMN) && (
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
                )}
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
          px: 1,
          py: 0.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: COLUMN_FOOTER_HEIGHT,
          borderTop: '1px solid rgba(87, 133, 219, 0.14)'
        }}>
          {!openNewCardForm
            ?
            hasPermission(permission.CREATE_CARD) && (
              <Button
                onClick={toggleOpenNewCardForm}
                startIcon={<QueueIcon sx={{ color: 'inherit', fontSize: '16px !important' }} />}
                variant="text"
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  color: '#91B5FF',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'transparent !important',
                  '&.MuiButton-root:hover': {
                    background: 'rgba(72, 122, 232, 0.13) !important',
                    color: '#C4D7FF'
                  },
                  backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                  '&:hover': {
                    backgroundColor: '#22C55E'// sáng hơn khi hover
                  }
                }}
              >
                Thêm thẻ
              </Button>
            )
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
                  className='interceptor-loading'
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
