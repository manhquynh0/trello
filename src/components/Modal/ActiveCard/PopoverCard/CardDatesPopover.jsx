import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { updateCardDetaislApi } from '~/apis'
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardInCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { toast } from 'react-toastify'

const toInputValue = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

const toDate = (value) => value ? new Date(value) : undefined

const formatDate = (value) => value
  ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
  : 'Chưa thiết lập'

function DateField({ icon, label, value, enabled, onToggle, onChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>{icon}<Box><Typography sx={{ fontWeight: 600, fontSize: '15px' }}>{label}</Typography><Typography sx={{ color: '#9CA3AF', fontSize: '13px' }}>{enabled ? 'Chọn ngày và giờ' : 'Chưa thiết lập'}</Typography></Box></Box>
        <Switch checked={enabled} onChange={onToggle} size="small" inputProps={{ 'aria-label': `Bật ${label}` }} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0EA5E9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0EA5E9' } }} />
      </Box>
      {enabled && <TextField type="datetime-local" value={value} onChange={onChange} fullWidth size="small" inputProps={{ step: 900 }} sx={{ ml: 4, width: 'calc(100% - 32px)', backgroundColor: '#1F2937', borderRadius: '6px', '& input': { color: 'white' }, '& input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' } }} />}
    </Box>
  )
}

function CardDatesPopover({ card, anchorEl, isOpen, onClose }) {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [startEnabled, setStartEnabled] = useState(false)
  const [dueEnabled, setDueEnabled] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setStartDate(toInputValue(card?.startDate))
    setDueDate(toInputValue(card?.dueDate))
    setStartEnabled(Boolean(card?.startDate))
    setDueEnabled(Boolean(card?.dueDate))
  }, [card, isOpen])

  const syncCard = (updatedCard) => {
    dispatch(updateCurrentActiveCard(updatedCard))
    dispatch(updateCardInCurrentActiveBoard(updatedCard))
  }

  const handleSave = async () => {
    if (startEnabled && dueEnabled && new Date(startDate) > new Date(dueDate)) {
      toast.error('Ngày bắt đầu phải trước ngày kết thúc!')
      return
    }
    setSaving(true)
    try {
      const updatedCard = await updateCardDetaislApi(card._id, {
        startDate: startEnabled && startDate ? new Date(startDate).toISOString() : null,
        dueDate: dueEnabled && dueDate ? new Date(dueDate).toISOString() : null
      })
      syncCard(updatedCard)
      toast.success('Cập nhật ngày thành công!')
      onClose()
    } catch (error) {
      toast.error('Cập nhật ngày thất bại!')
    } finally {
      setSaving(false)
    }
  }

  const handleClear = async () => {
    setSaving(true)
    try {
      const updatedCard = await updateCardDetaislApi(card._id, { startDate: null, dueDate: null })
      syncCard(updatedCard)
      toast.success('Đã xóa ngày!')
      onClose()
    } catch (error) {
      toast.error('Xóa ngày thất bại!')
    } finally {
      setSaving(false)
    }
  }

  const range = startEnabled || dueEnabled
    ? { from: startEnabled ? toDate(startDate) : toDate(dueDate), to: dueEnabled ? toDate(dueDate) : toDate(startDate) }
    : undefined

  return (
    <Popover open={isOpen} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '420px', maxWidth: 'calc(100vw - 24px)', border: '1px solid #374151', padding: '16px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}>
          <WatchLaterOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Dates</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 3 }}>Thiết lập ngày bắt đầu và ngày kết thúc để theo dõi thời gian.</Typography>
      <DateField icon={<CalendarTodayIcon
        sx={{
          color: '#9CA3AF',
          fontSize: '20px',
          mt: 0.5
        }} />}
      label="Ngày bắt đầu"
      value={startDate}
      enabled={startEnabled}
      onToggle={() => setStartEnabled(value => !value)}
      onChange={event => setStartDate(event.target.value)} />
      <DateField icon={<OutlinedFlagIcon
        sx={{
          color: '#9CA3AF',
          fontSize: '22px',
          mt: 0.5
        }} />}
      label="Ngày kết thúc"
      value={dueDate}
      enabled={dueEnabled}
      onToggle={() => setDueEnabled(value => !value)}
      onChange={event => setDueDate(event.target.value)} />
      <Box sx={{ backgroundColor: '#1F2937', borderRadius: '8px', p: 2, mb: 3 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 1 }}>Lịch xem trước</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .rdp-root': { '--rdp-accent-color': '#0EA5E9', '--rdp-accent-background-color': 'rgba(14, 165, 233, 0.2)', '--rdp-day-height': '32px', '--rdp-day-width': '32px', margin: 0 }
        }}>
          <DayPicker mode="range" selected={range} defaultMonth={range?.from} />
        </Box>
        <Typography sx={{ color: '#9CA3AF', fontSize: '12px', textAlign: 'center', mt: 1 }}>
          {startEnabled || dueEnabled ? `${formatDate(startEnabled ? startDate : dueDate)} - ${formatDate(dueEnabled ? dueDate : startDate)}` : 'Chưa chọn ngày'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={handleClear} disabled={saving || (!startEnabled && !dueEnabled)} sx={{ color: '#EF4444', borderColor: '#4B5563', textTransform: 'none' }}>Xóa ngày</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving || !card?._id} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', px: 4, '&:hover': { backgroundColor: '#0284C7' } }}>{saving ? 'Đang lưu...' : 'Lưu'}</Button>
      </Box>
    </Popover>
  )
}

export default CardDatesPopover
