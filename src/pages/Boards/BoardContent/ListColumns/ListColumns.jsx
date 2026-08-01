
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
function ListColumns({ columns, createdNewColumn, createdNewCard }) {
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
    const newColumn = {
      title: newColumnTitle
    }
    await createdNewColumn(newColumn)
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
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
        {columns?.map(column => <Column key={column._id} column={column} createdNewCard={createdNewCard} />)}
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