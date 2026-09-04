import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import CircularProgress from '@mui/material/CircularProgress'
import { createSearchParams } from 'react-router-dom'
import { useDebounceFn } from '~/customHooks/useDebounceFn'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCardInCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { createdLabelApi, deleteLabelApi, activeLabelApi, fetchLabelsApi } from '~/apis'
import { toast } from 'react-toastify'
const presetColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#A855F7', '#EC4899', '#6B7280']

function CardLabelsPopover({ card, anchorEl, isOpen, onClose }) {
  const dispatch = useDispatch()
  const [selectedColor, setSelectedColor] = useState(presetColors[0])
  const [labelName, setLabelName] = useState('')
  const [listLabels, setListLabels] = useState(card?.labels || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setListLabels(card?.labels || [])
  }, [card?.labels])

  const handleInputSearchChange = (searchValue) => {
    if (!searchValue) {
      setListLabels(card?.labels || [])
      return
    }

    const searchPath = `?${createSearchParams({ 'q[name]': searchValue })}`

    setLoading(true)
    fetchLabelsApi(card._id, searchPath)
      .then((res) => {
        setListLabels(res?.labels || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const debouncedHandleInputSearchChange = useDebounceFn(handleInputSearchChange)

  const onHandleAddLabel = async () => {
    if (!labelName.trim()) {
      toast.error('Nhãn không được để trống!')
      return
    }
    const newLabel = {
      name: labelName,
      color: selectedColor
    }
    toast.promise(
      createdLabelApi(card._id, newLabel), {
      pending: 'Đang xử lý'
    }
    ).then((data) => {
      dispatch(updateCardInCurrentActiveBoard(data))
      dispatch(updateCurrentActiveCard(data))
      toast.success('Thêm nhãn thành công!')
    }).catch(() => {
      toast.error('Thêm nhãn thất bại!')
    })
  }
  const onActiveLabel = (label) => {
    toast.promise(
      activeLabelApi(card._id, label._id, {
        isActive: !label.isActive
      }), {
      pending: 'Đang xử lý'
    }
    ).then((data) => {
      dispatch(updateCardInCurrentActiveBoard(data))
      dispatch(updateCurrentActiveCard(data))
      toast.success('Nhãn đã được kích hoạt!')
    }).catch(() => {
      toast.error('Kích hoạt nhãn thất bại!')
    })
  }
  const onUpdateLabelName = (labelId, newTitle) => {
    toast.promise(
      activeLabelApi(card._id, labelId, {
        name: newTitle
      }), {
      pending: 'Đang xử lý'
    }
    ).then((data) => {
      dispatch(updateCardInCurrentActiveBoard(data))
      dispatch(updateCurrentActiveCard(data))
      toast.success('Cập nhật nhãn thành công!')
    }).catch(() => {
      toast.error('Cập nhật nhãn thất bại!')
    })
  }
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '360px', border: '1px solid #374151' } }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ transform: 'rotate(45deg)', display: 'inline-block' }}>🏷️</span> Labels
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 2 }}>
          Sử dụng nhãn để phân loại và ưu tiên công việc của bạn.
        </Typography>

        <TextField
          fullWidth
          placeholder="Tìm nhãn..."
          variant="outlined"
          size="small"
          onChange={(e) => debouncedHandleInputSearchChange(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1F2937', color: 'white',
              '& fieldset': { borderColor: '#374151' },
              '&:hover fieldset': { borderColor: '#4B5563' },
              '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
            },
            '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1 }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6B7280' }} fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {loading ? <CircularProgress sx={{ color: '#6B7280' }} size={20} /> : null}
              </InputAdornment>
            )
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          {listLabels?.map((label) => (
            <Box key={label._id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ flex: 1, backgroundColor: '#1F2937', display: 'flex', alignItems: 'center', padding: '6px 12px', borderRadius: '6px' }}>
                <Box sx={{ width: '32px', height: '16px', borderRadius: '4px', backgroundColor: label.color, mr: 2 }} />
                <ToggleFocusInput sx={{ fontSize: '14px', flex: 1 }} value={label.name} onChangedValue={(newName) => onUpdateLabelName(label._id, newName)} />

                <Button
                  onClick={() => onActiveLabel(label)}
                  sx={{
                    minWidth: 'fit-content',
                    p: '6px 12px',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: 'small',
                    fontWeight: 600,
                    backgroundColor: label.isActive
                      ? '#EF4444'
                      : '#0EA5E9',

                    '&:hover': {
                      backgroundColor: label.isActive
                        ? '#DC2626'
                        : '#0284C7'
                    }
                  }}
                >
                  {label.isActive ? 'Gỡ' : 'Sử dụng'}
                </Button>
                {/* <IconButton size="small" onClick={onDeleteLabel} sx={{ color:  '#9CA3AF', p: '2px' }}><DeleteOutlineIcon fontSize="small" /></IconButton> */}

              </Box>
            </Box>
          ))}
        </Box>

        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 1 }}>Tạo nhãn mới</Typography>
        <TextField
          fullWidth
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Nhãn mới"
          variant="outlined"
          size="small"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1F2937', color: 'white',
              '& fieldset': { borderColor: '#374151' },
              '&:hover fieldset': { borderColor: '#4B5563' },
              '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
            },
            '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1 }
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {presetColors.map((color) => (
            <Box
              key={color}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',

                // màu đang được chọn
                border: selectedColor === color
                  ? '2px solid white'
                  : '2px solid transparent',

                // hiệu ứng hover
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              {selectedColor === color && (
                <CheckIcon
                  sx={{
                    color: 'white',
                    fontSize: '18px'
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onHandleAddLabel} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', fontWeight: 600, '&:hover': { backgroundColor: '#0284C7' } }}>
            Thêm
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default CardLabelsPopover
