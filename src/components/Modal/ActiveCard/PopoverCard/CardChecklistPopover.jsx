import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress from '@mui/material/LinearProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { createChecklist, createChecklistItem, updateCardDetaislApi } from '~/apis'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardInCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { confirm } from '~/utils/ConfirmDialog'

function CardChecklistPopover({ card, anchorEl, isOpen, onClose }) {
  const dispatch = useDispatch()
  const [checkListName, setCheckListName] = useState('')
  const [checkListNameItem, setCheckListNameItem] = useState('')
  const [openNewCheckList, setOpenNewCheckList] = useState(false)
  const [openId, setOpenId] = useState(null)
  const toggleOpen = (value, setValue) => {
    setValue(!value)
  }
  const toggleOpenId = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  const handleCreateCheckList = async () => {
    const name = checkListName.trim()

    if (!name) return
    await createChecklist(card._id, { name }).then(() => {
      toast.success('Thêm thành công')
    }).catch(() => toast.error('Lỗi'))
    setCheckListName('')
    toggleOpen(openNewCheckList, setOpenNewCheckList)
  }
  const handleCreateCheckListItem = async (checkListId) => {
    const name = checkListNameItem.trim()
    if (!name) return
    await createChecklistItem(card._id, checkListId, { name }).then(() => {
      toast.success('Thêm thành công')
    }).catch(() => toast.error('Lỗi'))

    setCheckListNameItem('')
    setOpenId(null)
  }
  const handleToggleCheckListItem = async (checkListId, checkListItemId, isSuccess) => {
    const checkList = card.checkList.map(checkListItem => {
      if (checkListItem._id !== checkListId) return checkListItem

      return {
        ...checkListItem,
        subItems: checkListItem.subItems.map(subItem =>
          subItem._id === checkListItemId ? { ...subItem, isSuccess } : subItem
        )
      }
    })
    try {
      const updatedCard = await updateCardDetaislApi(card._id, { checkList })
      dispatch(updateCurrentActiveCard(updatedCard))
      dispatch(updateCardInCurrentActiveBoard(updatedCard))
    } catch {
      toast.error('Không thể cập nhật trạng thái công việc')
    }
  }
  const handleDeleteCheckList = async (checkListId) => {
    const result = await confirm('Bạn có chắc muốn xóa danh sách kiểm tra này?', 'Xóa')
    if (!result.isConfirmed) return

    const checkList = card.checkList.filter(checkListItem => checkListItem._id !== checkListId)

    try {
      const updatedCard = await updateCardDetaislApi(card._id, { checkList })
      dispatch(updateCurrentActiveCard(updatedCard))
      dispatch(updateCardInCurrentActiveBoard(updatedCard))
      toast.success('Đã xóa danh sách kiểm tra')
    } catch {
      toast.error('Không thể xóa danh sách kiểm tra')
    }
  }
  const handleDeleteCheckListItem = async (checkListId, checkListItemId) => {
    const result = await confirm('Bạn có chắc muốn xóa công việc này?', 'Xóa')
    if (!result.isConfirmed) return

    const checkList = card.checkList.map(checkListItem => {
      if (checkListItem._id !== checkListId) return checkListItem

      return {
        ...checkListItem,
        subItems: checkListItem.subItems.filter(subItem => subItem._id !== checkListItemId)
      }
    })

    try {
      const updatedCard = await updateCardDetaislApi(card._id, { checkList })
      dispatch(updateCurrentActiveCard(updatedCard))
      dispatch(updateCardInCurrentActiveBoard(updatedCard))
      toast.success('Đã xóa công việc')
    } catch {
      toast.error('Không thể xóa công việc')
    }
  }
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '380px', border: '1px solid #374151' } }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Danh sách công việc
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 2 }}>
          Chia nhỏ công việc thành các bước nhỏ hơn và theo dõi tiến độ.
        </Typography>

        {/* Development Checklist */}

        {card?.checkList?.map((item) => (
          <Box key={item._id} sx={{ backgroundColor: '#1F2937', borderRadius: '8px', p: 2, mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* <RadioButtonUncheckedIcon sx={{ color: '#6B7280', fontSize: '20px', mr: 1 }} /> */}
                <Typography sx={{ fontWeight: 600, flex: 1 }}>{item.name}</Typography>
                <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mr: 1 }}>{item?.subItems?.filter(subItem => subItem.isSuccess).length || 0}/{item?.subItems?.length || 0}</Typography>
                <IconButton size="small" onClick={() => handleDeleteCheckList(item._id)} sx={{ color: '#F87171', p: 0.5 }} aria-label="Xóa danh sách kiểm tra">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>


              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>

                <LinearProgress variant="determinate" value={item?.subItems?.length ? (item.subItems.filter(subItem => subItem.isSuccess).length / item.subItems.length) * 100 : 0} sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: '#374151', '& .MuiLinearProgress-bar': { backgroundColor: '#22C55E' } }} />
                <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>{item?.subItems?.length ? (item.subItems.filter(subItem => subItem.isSuccess).length / item.subItems.length) * 100 : 0} %</Typography>
              </Box>
              <Box sx={{
                display: 'flex', gap: 1, mb: 1, flexDirection: 'column'
              }}>
                {item?.subItems?.length > 0 && item?.subItems?.map((subItem) => (
                  <Box key={subItem._id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={Boolean(subItem.isSuccess)}
                      onChange={(event) => handleToggleCheckListItem(item._id, subItem._id, event.target.checked)}
                      sx={{ color: '#9CA3AF', '&.Mui-checked': { color: '#22C55E' } }}
                    />
                    <Typography sx={{ fontSize: '14px', color: 'white', flex: 1 }}>{subItem.name} </Typography>
                    <IconButton size="small" onClick={() => handleDeleteCheckListItem(item._id, subItem._id)} sx={{ color: '#9CA3AF', p: 0.25 }} aria-label="Xóa công việc">
                      <DeleteOutlineIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>


            {openId !== item._id ? <Button startIcon={<AddIcon />} onClick={() => { toggleOpenId(item._id) }} sx={{ color: '#0EA5E9', textTransform: 'none', pl: 3, mt: 1, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
              Thêm nhiệm vụ
            </Button> : (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151'
                }}
              >
                <Typography
                  sx={{
                    color: '#F3F4F6',
                    fontSize: 14,
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  Tạo nhiệm vụ
                </Typography>

                <TextField
                  autoFocus
                  fullWidth
                  size="small"
                  placeholder="Tên nhiệm vụ..."
                  value={checkListNameItem}
                  onChange={(e) => setCheckListNameItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateCheckListItem(item._id)
                    }

                    if (e.key === 'Escape') {
                      toggleOpenId(item._id)
                    }
                  }}
                  sx={{
                    mb: 1.5,

                    '& .MuiOutlinedInput-root': {
                      color: '#F9FAFB',
                      backgroundColor: '#111827',

                      '& fieldset': {
                        borderColor: '#4B5563'
                      },

                      '&:hover fieldset': {
                        borderColor: '#6B7280'
                      },

                      '&.Mui-focused fieldset': {
                        borderColor: '#818CF8'
                      }
                    },

                    '& input::placeholder': {
                      color: '#6B7280',
                      opacity: 1
                    }
                  }}
                />

                <Stack direction="row" spacing={1}>

                  <Button
                    className='interceptor-loading'
                    variant="contained"
                    size="small"
                    onClick={() => handleCreateCheckListItem(item._id)}
                    disabled={!checkListNameItem.trim()}
                    sx={{
                      backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                      '&:hover': {
                        backgroundColor: '#22C55E'// sáng hơn khi hover
                      }
                    }}

                  >
                    Tạo
                  </Button>

                  <Button
                    size="small"
                    onClick={() => { toggleOpenId(item._id) }}
                    sx={{
                      color: '#9CA3AF',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#374151'
                      }
                    }}
                  >
                    Hủy
                  </Button>
                </Stack>
              </Box>
            )}

          </Box>
        ))}
        {!openNewCheckList ? (
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => { toggleOpen(openNewCheckList, setOpenNewCheckList) }}
            sx={{
              color: '#9CA3AF',
              backgroundColor: '#1F2937',
              textTransform: 'none',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: '#374151'
              }
            }}
          >
            Thêm danh sách kiểm tra
          </Button>
        ) : (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: '#1F2937',
              border: '1px solid #374151'
            }}
          >
            <Typography
              sx={{
                color: '#F3F4F6',
                fontSize: 14,
                fontWeight: 600,
                mb: 1
              }}
            >
              Tạo danh sách kiểm tra
            </Typography>

            <TextField
              autoFocus
              fullWidth
              size="small"
              placeholder="Tên danh sách kiểm tra..."
              value={checkListName}
              onChange={(e) => setCheckListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateCheckList()
                }

                if (e.key === 'Escape') {
                  toggleOpen(openNewCheckList, setOpenNewCheckList)
                }
              }}
              sx={{
                mb: 1.5,

                '& .MuiOutlinedInput-root': {
                  color: '#F9FAFB',
                  backgroundColor: '#111827',

                  '& fieldset': {
                    borderColor: '#4B5563'
                  },

                  '&:hover fieldset': {
                    borderColor: '#6B7280'
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#818CF8'
                  }
                },

                '& input::placeholder': {
                  color: '#6B7280',
                  opacity: 1
                }
              }}
            />

            <Stack direction="row" spacing={1}>

              <Button
                className='interceptor-loading'
                variant="contained"
                size="small"
                onClick={handleCreateCheckList}
                disabled={!checkListName.trim()}
                sx={{
                  backgroundColor: '#16A34A', // màu mặc định khi chưa hover
                  '&:hover': {
                    backgroundColor: '#22C55E'// sáng hơn khi hover
                  }
                }}

              >
                Tạo
              </Button>

              <Button
                size="small"
                onClick={() => { toggleOpen(openNewCheckList, setOpenNewCheckList) }}
                sx={{
                  color: '#9CA3AF',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#374151'
                  }
                }}
              >
                Hủy
              </Button>
            </Stack>
          </Box>
        )}

      </Box>
    </Popover>
  )
}

export default CardChecklistPopover
