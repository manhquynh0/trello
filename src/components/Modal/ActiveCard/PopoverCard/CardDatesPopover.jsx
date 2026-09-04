import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import RepeatIcon from '@mui/icons-material/Repeat'
import Switch from '@mui/material/Switch'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import moment from 'moment'


function CardDatesPopover({ anchorEl, isOpen, onClose }) {
  const [range, setRange] = useState()
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '580px', border: '1px solid #374151', padding: '16px' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}>
          <WatchLaterOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Dates
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 3 }}>
        Thiết lập ngày bắt đầu và ngày kết thúc để theo dõi thời gian.
      </Typography>

      {/* Start Date Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <CalendarTodayIcon sx={{ color: '#9CA3AF', fontSize: '20px', mt: 0.5 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Ngày bắt đầu</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: '13px' }}>Khi nào thẻ này bắt đầu?</Typography>
            </Box>
          </Box>
          <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0EA5E9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0EA5E9' } }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
          <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'center', p: '6px 12px', border: '1px solid #374151' }}>
            <CalendarTodayIcon sx={{ color: '#9CA3AF', fontSize: '16px', mr: 1 }} />
            <Typography sx={{ flex: 1, fontSize: '14px' }}>Sep 3, 2026</Typography>
          </Box>
          <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'center', p: '6px 12px', border: '1px solid #374151' }}>
            <WatchLaterOutlinedIcon sx={{ color: '#9CA3AF', fontSize: '16px', mr: 1 }} />
            <Typography sx={{ flex: 1, fontSize: '14px' }}>9:00 AM</Typography>
            <CloseIcon sx={{ color: '#9CA3AF', fontSize: '16px', cursor: 'pointer' }} />
          </Box>
        </Box>
      </Box>

      {/* Due Date Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <OutlinedFlagIcon sx={{ color: '#9CA3AF', fontSize: '22px', mt: 0.5 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Ngày kết thúc</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: '13px' }}>Khi nào thẻ này kết thúc?</Typography>
            </Box>
          </Box>
          <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0EA5E9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0EA5E9' } }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
          <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'center', p: '6px 12px', border: '1px solid #374151' }}>
            <CalendarTodayIcon sx={{ color: '#9CA3AF', fontSize: '16px', mr: 1 }} />
            <Typography sx={{ flex: 1, fontSize: '14px' }}>Sep 10, 2026</Typography>
          </Box>
          <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', display: 'flex', alignItems: 'center', p: '6px 12px', border: '1px solid #374151' }}>
            <WatchLaterOutlinedIcon sx={{ color: '#9CA3AF', fontSize: '16px', mr: 1 }} />
            <Typography sx={{ flex: 1, fontSize: '14px' }}>5:00 PM</Typography>
            <CloseIcon sx={{ color: '#9CA3AF', fontSize: '16px', cursor: 'pointer' }} />
          </Box>
        </Box>
      </Box>

      {/* Set Reminder Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <NotificationsNoneOutlinedIcon sx={{ color: '#9CA3AF', fontSize: '22px' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Đặt lời nhắc</Typography>
          </Box>
          <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0EA5E9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0EA5E9' } }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
          <Select
            value="1day"
            size="small"
            sx={{ flex: 1, backgroundColor: '#1F2937', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}
          >
            <MenuItem value="1day">1 day before</MenuItem>
          </Select>
          <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', p: '8px 12px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ color: '#9CA3AF', fontSize: '11px' }}>sẽ được thông báo vào</Typography>
            <Typography sx={{ fontSize: '12px' }}>Sep 9, 2026, 5:00 PM</Typography>
          </Box>
        </Box>
      </Box>

      {/* Repeat Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <RepeatIcon sx={{ color: '#9CA3AF', fontSize: '22px' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Lặp lại</Typography>
          </Box>
          <Switch size="small" />
        </Box>
        <Box sx={{ ml: 4, width: 'calc(50% - 8px)' }}>
          <Select
            value="none"
            size="small"
            fullWidth
            sx={{ backgroundColor: '#1F2937', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}
          >
            <MenuItem value="none">Không lặp lại</MenuItem>
            <MenuItem value="everyday">Hàng ngày</MenuItem>
            <MenuItem value="everyday">Hàng tuần</MenuItem>
            <MenuItem value="everyday">Hàng tháng</MenuItem>
            <MenuItem value="everyday">Hàng năm</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Calendar Preview */}
      <Box sx={{ backgroundColor: '#1F2937', borderRadius: '8px', p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WatchLaterOutlinedIcon sx={{ color: '#9CA3AF', fontSize: '18px' }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Lịch xem trước</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{
            width: '280px',
            flexShrink: 0,
            '& .rdp-root': {
              '--rdp-accent-color': '#0EA5E9',
              '--rdp-accent-background-color': 'rgba(14, 165, 233, 0.2)',
              '--rdp-day-height': '36px',
              '--rdp-day-width': '36px',
              margin: 0
            },
            '& .rdp-day_button:hover:not([disabled])': {
              backgroundColor: '#374151'
            },
            '& .rdp-range_start .rdp-day_button:hover, & .rdp-range_end .rdp-day_button:hover': {
              backgroundColor: '#0EA5E9'
            },
            '& .rdp-range_middle .rdp-day_button:hover': {
              backgroundColor: 'transparent'
            }
          }}>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              footer={
                range ? `Đã chọn : ${moment(range.from).format('DD-MM-YYYY')} - ${moment(range.to).format('DD-MM-YYYY')}` : 'Chọn một ngày'
              }
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, position: 'relative' }}>
            <Box sx={{ position: 'absolute', left: '4px', top: '8px', bottom: '24px', width: '2px', backgroundColor: '#374151', zIndex: 0 }} />

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, position: 'relative', zIndex: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#0EA5E9', mt: 0.5 }} />
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Bắt đầu</Typography>
                <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Thứ 5, 3 tháng 9, 2026 - 9:00 AM</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, position: 'relative', zIndex: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444', mt: 0.5 }} />
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Kết thúc</Typography>
                <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Thứ 5, 10 tháng 9, 2026 - 5:00 PM</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, position: 'relative', zIndex: 1, ml: '-2px' }}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: '14px', color: '#9CA3AF', backgroundColor: '#1F2937' }} />
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#9CA3AF' }}>Nhắc nhở</Typography>
                <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Thứ 4, 9 tháng 9, 2026 - 5:00 PM<br />(1 ngày trước)</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, position: 'relative', zIndex: 1, ml: '-2px' }}>
              <RepeatIcon sx={{ fontSize: '14px', color: '#9CA3AF', backgroundColor: '#1F2937' }} />
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#9CA3AF' }}>Lặp lại</Typography>
                <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Không lặp lại</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<DeleteOutlineIcon />}
          sx={{ color: '#EF4444', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#7F1D1D20', borderColor: '#EF4444' } }}
        >
          Xóa ngày
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', px: 4, '&:hover': { backgroundColor: '#0284C7' } }}>
          Lưu
        </Button>
      </Box>
    </Popover>
  )
}

export default CardDatesPopover
