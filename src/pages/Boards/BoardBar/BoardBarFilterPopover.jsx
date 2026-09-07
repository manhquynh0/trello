import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import { useEffect, useState } from 'react'

function BoardBarFilterPopover({ board, filters, anchorEl, isOpen, onClose, onApply }) {
  const [draftFilters, setDraftFilters] = useState(filters)

  useEffect(() => {
    setDraftFilters(filters)
  }, [filters, isOpen])

  const members = board?.FE_allUser || []
  const labels = (board?.columns || [])
    .flatMap(column => column.cards || [])
    .flatMap(card => card.labels || [])
    .filter(label => label.isActive !== false)
    .filter((label, index, allLabels) => allLabels.findIndex(item => item._id === label._id) === index)

  const updateFilter = (key, value) => {
    setDraftFilters(previous => ({ ...previous, [key]: value }))
  }

  const clearFilters = () => {
    onApply({ search: '', memberId: 'all', labelId: 'all', dueDate: 'any', checklist: 'any', attachments: 'any' })
  }

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '640px', border: '1px solid #374151', padding: '16px' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '20px', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterAltOutlinedIcon /> Lọc thẻ
          </Typography>
          <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mt: 0.5 }}>
            Tìm các thẻ phù hợp với điều kiện bạn chọn.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button variant="outlined" onClick={clearFilters} sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#374151', borderColor: '#4B5563' } }}>
            Xóa tất cả
          </Button>
          <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>Tìm kiếm</Typography>
        <TextField
          fullWidth
          placeholder="Tìm thẻ..."
          value={draftFilters.search}
          onChange={event => updateFilter('search', event.target.value)}
          variant="outlined"
          size="small"
          sx={{
            mb: 0.5,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1F2937', color: 'white', borderRadius: '6px',
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
            )
          }}
        />
        <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>Tìm theo tiêu đề hoặc mô tả.</Typography>
      </Box>

      {/* Grid of filters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        {/* Column 1 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Members */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PersonOutlineIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Thành viên
            </Typography>
            <Select value={draftFilters.memberId} onChange={event => updateFilter('memberId', event.target.value)} size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1.5, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="all">Tất cả thành viên</MenuItem>
              {members.map(member => <MenuItem key={member._id} value={member._id}>{member.displayName || member.username || member.email}</MenuItem>)}
            </Select>
          </Box>

          {/* Due date */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarMonthIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Ngày hết hạn
            </Typography>
            <Select value={draftFilters.dueDate} onChange={event => updateFilter('dueDate', event.target.value)} size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Bất kỳ thời điểm nào</MenuItem>
              <MenuItem value="none">Chưa có ngày hạn</MenuItem>
              <MenuItem value="overdue">Đã quá hạn</MenuItem>
              <MenuItem value="today">Hết hạn hôm nay</MenuItem>
              <MenuItem value="next7">Trong 7 ngày tới</MenuItem>
            </Select>
          </Box>

          {/* Card content */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <DescriptionOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Nội dung thẻ
            </Typography>
            <TextField
              fullWidth
              placeholder="Nhập từ khóa..."
              value={draftFilters.search}
              onChange={event => updateFilter('search', event.target.value)}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#111827', color: 'white', borderRadius: '6px',
                  '& fieldset': { borderColor: '#374151' }
                },
                '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1, fontSize: '13px' }
              }}
            />
          </Box>
        </Box>

        {/* Column 2 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Labels */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocalOfferOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Nhãn
            </Typography>
            <Select value={draftFilters.labelId} onChange={event => updateFilter('labelId', event.target.value)} size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1.5, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="all">Tất cả nhãn</MenuItem>
              {labels.map(label => <MenuItem key={label._id} value={label._id}>{label.name}</MenuItem>)}
            </Select>
          </Box>

          {/* Checklist */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TaskAltOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Checklist
            </Typography>
            <Select value={draftFilters.checklist} onChange={event => updateFilter('checklist', event.target.value)} size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Bất kỳ trạng thái nào</MenuItem>
              <MenuItem value="with">Có checklist</MenuItem>
              <MenuItem value="without">Không có checklist</MenuItem>
              <MenuItem value="completed">Checklist đã hoàn tất</MenuItem>
              <MenuItem value="incomplete">Checklist chưa hoàn tất</MenuItem>
            </Select>
          </Box>

          {/* Attachments */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AttachFileOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF', transform: 'rotate(45deg)' }} /> Tệp đính kèm
            </Typography>
            <Select value={draftFilters.attachments} onChange={event => updateFilter('attachments', event.target.value)} size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Bất kỳ</MenuItem>
              <MenuItem value="with">Có tệp đính kèm</MenuItem>
              <MenuItem value="without">Không có tệp đính kèm</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      {/* Custom fields */}
      <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2, mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TuneOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Trường tùy chỉnh
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Select value="any" size="small" sx={{ flex: 1, backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
            <MenuItem value="any">Bất kỳ trường nào</MenuItem>
          </Select>
          <Select value="any" size="small" sx={{ flex: 1, backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
            <MenuItem value="any">Bất kỳ giá trị nào</MenuItem>
          </Select>
          <TextField
            placeholder="Nhập giá trị..."
            variant="outlined"
            size="small"
            sx={{
              flex: 1.5,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#111827', color: 'white', borderRadius: '6px',
                '& fieldset': { borderColor: '#374151' }
              },
              '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1, fontSize: '13px' }
            }}
          />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1, borderTop: '1px solid #374151' }}>
        <Button variant="outlined" startIcon={<BookmarkBorderOutlinedIcon />} sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#374151', borderColor: '#4B5563' } }}>
          Lưu bộ lọc
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#374151', borderColor: '#4B5563' } }}>
            Hủy
          </Button>
          <Button variant="contained" onClick={() => { onApply(draftFilters); onClose() }} startIcon={<FilterAltOutlinedIcon />} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', '&:hover': { backgroundColor: '#0284C7' } }}>
            Áp dụng
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default BoardBarFilterPopover
