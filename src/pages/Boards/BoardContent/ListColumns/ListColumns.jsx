
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import QueueIcon from '@mui/icons-material/Queue'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import InputAdornment from '@mui/material/InputAdornment'
import { toast } from 'react-toastify'
import { isEmpty, cloneDeep } from 'lodash'
import { createdNewColumnAPI } from '~/apis'
import {
  generatePlaceholderCard
} from '~/utils/PlaceHolderCard'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
function ListColumns({ columns }) {
  const board = useSelector(selectCurrentActiveBoard)
  const dispatch = useDispatch()
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Title is Not Empty', {
        theme: 'colored'
      })
      return
    }
    try {
      const newColumn = {
        title: newColumnTitle
      }
      const createdColumn = await createdNewColumnAPI({
        ...newColumn,
        boardId: board._id
      })

      if (isEmpty(createdColumn.cards)) {
        const placeholderCard = generatePlaceholderCard(createdColumn)

        createdColumn.cards = [placeholderCard]
        createdColumn.cardOrderIds = [placeholderCard._id]
      }

      // Immutability
      // Nhưng khi chuyển sang Redux, board lấy từ useSelector() là state của Redux. State này được Redux Toolkit (thông qua Immer) bảo vệ trong môi trường phát triển, nên không nên sửa trực tiếp. Vì vậy nếu chỉ shallow copy object ngoài cùng rồi push vào mảng cũ, bạn sẽ gặp lỗi.
      const newBoard = cloneDeep(board)
      newBoard.columns.push(createdColumn)
      newBoard.columnOrderIds.push(createdColumn._id)

      // cách 2 :
      // const newBoard = { ...board }
      // newBoard.columns = newBoard.columns.concat([createdColumn])
      // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn._id])

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
      // setBoard(newBoard)
      dispatch(updateCurrentActiveBoard(newBoard))
      toggleOpenNewColumnForm()
      setNewColumnTitle('')
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
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        gap: 2,
        '&::-webkit-scrollbar-track': {
          m: 2
        },
        m: 2
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}
        {!openNewColumnForm ?
          <Box onClick={toggleOpenNewColumnForm} sx={{
            maxWidth: '250px',
            bgcolor: 'background.paper',
            height: 'fit-content',
            borderRadius: '8px',
            p: '5px',
            flexShrink: 0
          }}>
            <Button
              startIcon={<QueueIcon sx={{ color: 'inherit' }} />}
              variant="contained"
              sx={{
                backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                '&:hover': {
                  backgroundColor: '#22C55E'// sáng hơn khi hover
                }
              }}
            >
              ADD NEW COLUMN
            </Button>

          </Box> :
          <Box sx={{
            maxWidth: '250px',
            mx: 2,
            gap: 1,
            bgcolor: 'background.paper',
            height: 'fit-content',
            borderRadius: '8px',
            p: '10px',
            flexShrink: 0
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
            }}>
              <TextField
                id="outlined-basic"
                label="Enter Column Title"
                variant="outlined"
                autoFocus
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon
                        fontSize="small"
                        sx={{ cursor: 'pointer' }}
                        onClick={toggleOpenNewColumnForm}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Button
              onClick={addNewColumn}
              startIcon={<QueueIcon sx={{ color: 'inherit' }} />}
              variant="contained"
              sx={{
                backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                '&:hover': {
                  backgroundColor: '#22C55E'// sáng hơn khi hover
                }
              }}
            >
              ADD NEW COLUMN
            </Button>
          </Box>}

      </Box>
    </SortableContext>
  )
}

export default ListColumns