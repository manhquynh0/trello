import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import LinkIcon from '@mui/icons-material/Link'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import WebhookIcon from '@mui/icons-material/Webhook'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

// --- Helper Components for UI parts ---

const SidebarItem = ({ icon, label, badge, active, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', mb: 0.5,
      backgroundColor: active ? '#1E3A8A' : 'transparent',
      color: active ? 'white' : '#9CA3AF',
      '&:hover': { backgroundColor: active ? '#1E3A8A' : '#1F2937' }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {icon}
      <Typography sx={{ fontWeight: active ? 600 : 500, fontSize: '14px' }}>{label}</Typography>
    </Box>
    {badge !== undefined && (
      <Box sx={{ backgroundColor: active ? '#2563EB' : '#374151', color: active ? 'white' : '#D1D5DB', fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px' }}>
        {badge}
      </Box>
    )}
  </Box>
)

const RuleCard = ({ switchOn, title, description, conditions, tags, updated, iconColor = '#22C55E' }) => (
  <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Switch checked={switchOn} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: iconColor }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: iconColor } }} />
        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{title}</Typography>
      </Box>
      <IconButton size="small" sx={{ color: '#9CA3AF' }}><MoreHorizIcon fontSize="small" /></IconButton>
    </Box>
    <Box sx={{ ml: 6, display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
      {conditions.map((cond, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {cond.icon}
          <Typography sx={{ color: '#D1D5DB', fontSize: '13px' }}>{cond.text}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ml: 6 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {tags.map((tag, idx) => (
          <Box key={idx} sx={{ border: '1px solid #4B5563', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', color: '#9CA3AF' }}>{tag}</Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: '11px', color: '#6B7280' }}>{updated}</Typography>
    </Box>
  </Box>
)

const TemplateCard = ({ icon, title, desc, btnText = 'Dùng mẫu' }) => (
  <Box sx={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', p: 2, mb: 1.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
      <Box sx={{ width: 28, height: 28, borderRadius: '6px', backgroundColor: '#1F2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: '13px', lineHeight: 1.2, flex: 1 }}>{title}</Typography>
    </Box>
    <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mb: 2, ml: '40px' }}>{desc}</Typography>
    <Box sx={{ ml: '40px' }}>
      <Button variant="outlined" size="small" sx={{ color: '#D1D5DB', borderColor: '#4B5563', textTransform: 'none', py: 0.5, '&:hover': { backgroundColor: '#1F2937', borderColor: '#6B7280' } }}>
        {btnText}
      </Button>
    </Box>
  </Box>
)

// --- Tab Content Components ---

const RulesContent = () => (
  <>
    {/* Danh sách quy tắc */}
    <Box sx={{ width: '380px', borderRight: '1px solid #374151', p: 3, display: 'flex', flexDirection: 'column', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Quy tắc (3)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', px: 2, '&:hover': { backgroundColor: '#0284C7' } }}>
          Tạo quy tắc
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm quy tắc..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': { backgroundColor: '#111827', color: 'white', '& fieldset': { borderColor: '#374151' } },
            '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1, fontSize: '13px' }
          }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6B7280', fontSize: '18px' }} /></InputAdornment> }}
        />
        <Select value="all" size="small" sx={{ width: '120px', backgroundColor: '#111827', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="all">Tất cả trạng thái</MenuItem>
        </Select>
      </Box>

      <RuleCard
        switchOn={true}
        title="Chuyển sang Hoàn thành khi checklist hoàn tất"
        conditions={[
          { icon: <CheckCircleOutlineIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'Khi checklist hoàn tất' },
          { icon: <ArrowForwardIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'Chuyển thẻ sang Hoàn thành' }
        ]}
        tags={['Checklist', 'Di chuyển']}
        updated="Cập nhật 2 giờ trước"
      />
      <RuleCard
        switchOn={true}
        iconColor="#3B82F6"
        title="Thêm thành viên khi tạo thẻ"
        conditions={[
          { icon: <CheckCircleOutlineIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'Khi một thẻ được tạo' },
          { icon: <PersonOutlineIcon sx={{ color: '#3B82F6', fontSize: '18px' }} />, text: 'Thêm thành viên: Tôi' }
        ]}
        tags={['Thẻ', 'Thành viên']}
        updated="Cập nhật 1 ngày trước"
      />
      <RuleCard
        switchOn={false}
        iconColor="#9CA3AF"
        title="Thông báo trước ngày hết hạn 1 ngày"
        conditions={[
          { icon: <CalendarMonthIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'Khi còn 1 ngày đến hạn' },
          { icon: <NotificationsNoneIcon sx={{ color: '#3B82F6', fontSize: '18px' }} />, text: 'Gửi thông báo cho thành viên của thẻ' }
        ]}
        tags={['Ngày hết hạn', 'Thông báo']}
        updated="Cập nhật 3 ngày trước"
      />
    </Box>

    {/* Biểu mẫu tạo quy tắc */}
    <Box sx={{ width: '420px', borderRight: '1px solid #374151', p: 3, display: 'flex', flexDirection: 'column', backgroundColor: '#1F2937', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FlashOnIcon sx={{ color: '#9CA3AF' }} />
        <Typography sx={{ fontWeight: 600, fontSize: '16px', flex: 1 }}>Tạo quy tắc tự động</Typography>
        <IconButton size="small" sx={{ color: '#9CA3AF' }}><CloseIcon fontSize="small" /></IconButton>
      </Box>

      <Box sx={{ backgroundColor: '#111827', p: 2, borderRadius: '8px', border: '1px solid #374151', mb: 2 }}>
        <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Tên quy tắc</Typography>
        <TextField
          fullWidth
          value="Chuyển sang Hoàn thành khi checklist hoàn tất"
          variant="outlined"
          size="small"
          sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1F2937', color: 'white', '& fieldset': { borderColor: '#374151' } } }}
        />
        <Typography sx={{ fontSize: '11px', color: '#6B7280', textAlign: 'right', mt: 0.5 }}>42/100</Typography>
      </Box>

      <Box sx={{ backgroundColor: '#111827', p: 2, borderRadius: '8px', border: '1px solid #374151', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
          <FlashOnIcon sx={{ color: '#22C55E' }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Khi</Typography>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Chọn sự kiện kích hoạt tự động hóa.</Typography>
          </Box>
        </Box>
        <Select value="check" size="small" fullWidth sx={{ backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="check"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><TaskAltIcon fontSize="small" /> Checklist hoàn tất</Box></MenuItem>
        </Select>
      </Box>

      <Box sx={{ backgroundColor: '#111827', p: 2, borderRadius: '8px', border: '1px solid #374151', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
          <ArrowForwardIcon sx={{ color: '#3B82F6' }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Thì</Typography>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Chọn hành động sẽ thực hiện.</Typography>
          </Box>
        </Box>
        <Select value="move" size="small" fullWidth sx={{ mb: 2, backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="move"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><DashboardIcon fontSize="small" /> Chuyển thẻ sang cột</Box></MenuItem>
        </Select>
        <Typography sx={{ fontSize: '12px', color: '#9CA3AF', mb: 0.5 }}>Chọn cột</Typography>
        <Select value="done" size="small" fullWidth sx={{ mb: 3, backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="done"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 14, height: 14, borderRadius: '2px', backgroundColor: '#22C55E' }} /> Done</Box></MenuItem>
        </Select>
        <Button startIcon={<AddIcon />} sx={{ color: '#60A5FA', textTransform: 'none', backgroundColor: '#1E3A8A40', '&:hover': { backgroundColor: '#1E3A8A60' } }}>
          Thêm hành động
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SettingsOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Tùy chọn <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(không bắt buộc)</span>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5 }} />
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Chỉ áp dụng cho thẻ có nhãn cụ thể</Typography>
            <Select value="none" size="small" fullWidth sx={{ backgroundColor: '#111827', color: '#9CA3AF', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="none"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalOfferOutlinedIcon fontSize="small" /> Chọn nhãn...</Box></MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5 }} />
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Chỉ áp dụng cho thẻ có thành viên cụ thể</Typography>
            <Select value="none" size="small" fullWidth sx={{ backgroundColor: '#111827', color: '#9CA3AF', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="none"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PersonOutlineIcon fontSize="small" /> Chọn thành viên...</Box></MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 'auto', pt: 2, borderTop: '1px solid #374151' }}>
        <Button variant="outlined" sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none' }}>Hủy</Button>
        <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Tạo quy tắc</Button>
      </Box>
    </Box>

    {/* Mẫu quy tắc */}
    <Box sx={{ width: '320px', p: 3, overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Mẫu</Typography>
        <Typography sx={{ color: '#60A5FA', fontSize: '13px', cursor: 'pointer' }}>Xem tất cả</Typography>
      </Box>

      <TemplateCard icon={<CheckCircleOutlineIcon sx={{ color: '#22C55E' }} />} title="Chuyển thẻ khi checklist hoàn tất" desc="Khi checklist hoàn tất → Chuyển thẻ sang cột khác" />
      <TemplateCard icon={<CalendarMonthIcon sx={{ color: '#EC4899' }} />} title="Đặt ngày hết hạn khi di chuyển" desc="Khi thẻ được chuyển sang cột → Đặt ngày hết hạn" />
      <TemplateCard icon={<PersonOutlineIcon sx={{ color: '#60A5FA' }} />} title="Thêm thành viên khi tạo thẻ" desc="Khi một thẻ được tạo → Thêm thành viên" />
      <TemplateCard icon={<LocalOfferOutlinedIcon sx={{ color: '#F43F5E' }} />} title="Thêm nhãn khi di chuyển" desc="Khi thẻ được chuyển → Thêm nhãn" />
      <TemplateCard icon={<NotificationsNoneIcon sx={{ color: '#FACC15' }} />} title="Thông báo trước ngày hết hạn" desc="Khi còn X ngày đến hạn → Gửi thông báo" />

      <Box sx={{ mt: 4, p: 2, border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 2 }}>Cần ý tưởng?</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LightbulbOutlinedIcon sx={{ color: '#FACC15', fontSize: '32px' }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', mb: 0.5 }}>Tiết kiệm thời gian với tự động hóa</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mb: 1, lineHeight: 1.4 }}>Tự động hóa các tác vụ lặp lại để tập trung vào điều quan trọng.</Typography>
            <Typography sx={{ color: '#60A5FA', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Tìm hiểu thêm <ArrowForwardIcon sx={{ fontSize: '14px', ml: 0.5 }} /></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
)

const ButtonContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <PlayArrowIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Quy tắc bằng nút bấm</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Tạo nút thực hiện nhiều hành động cùng lúc khi được bấm. Bạn có thể thêm nút vào thẻ hoặc thanh đầu bảng.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Tạo nút</Button>
  </Box>
)

const ScheduledContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <WatchLaterOutlinedIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Quy tắc theo lịch</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Thiết lập quy tắc tự động chạy vào thời điểm cụ thể, như 9 giờ sáng thứ Hai hằng tuần hoặc ngày đầu mỗi tháng.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Tạo quy tắc theo lịch</Button>
  </Box>
)

const WebhooksContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <WebhookIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Webhook</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Gửi yêu cầu HTTP đến các dịch vụ khác khi có sự kiện cụ thể xảy ra trên bảng.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Tạo webhook</Button>
  </Box>
)


function BoardBarAutomationPopover({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('rules')

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          backgroundColor: '#111827',
          color: 'white',
          borderRadius: '12px',
          border: '1px solid #374151',
          width: '1200px',
          maxWidth: '95vw',
          height: '750px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#1F2937' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <FlashOnIcon sx={{ color: '#60A5FA', fontSize: '32px', mt: 0.5 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '22px' }}>Tự động hóa</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mt: 0.5 }}>
              Để Qllo hỗ trợ bạn. Tạo quy tắc để tự động quản lý các thẻ.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#9CA3AF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Box sx={{ width: '220px', borderRight: '1px solid #374151', p: 2, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <SidebarItem icon={<FormatListBulletedIcon fontSize="small" />} label="Quy tắc" badge="3" active={activeTab === 'rules'} onClick={() => setActiveTab('rules')} />
          <SidebarItem icon={<PlayArrowIcon fontSize="small" />} label="Nút bấm" badge="2" active={activeTab === 'button'} onClick={() => setActiveTab('button')} />
          <SidebarItem icon={<WatchLaterOutlinedIcon fontSize="small" />} label="Theo lịch" badge="1" active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')} />
          <SidebarItem icon={<WebhookIcon fontSize="small" />} label="Webhook" badge="0" active={activeTab === 'webhooks'} onClick={() => setActiveTab('webhooks')} />

          <Box sx={{ my: 2, borderBottom: '1px solid #374151' }} />

          <SidebarItem icon={<AutoAwesomeOutlinedIcon fontSize="small" />} label="Mẫu" active={false} onClick={() => { }} />
          <SidebarItem icon={<FormatListBulletedIcon fontSize="small" />} label="Nhật ký hoạt động" active={false} onClick={() => { }} />

          <Box sx={{ mt: 'auto', p: 2, backgroundColor: '#1F2937', borderRadius: '8px', border: '1px solid #374151' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#FACC15' }}>
              👑 Nâng cấp lên Pro
            </Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '11px', mb: 2, lineHeight: 1.4 }}>
              Sử dụng tính năng tự động hóa nâng cao, nhiều điều kiện và hơn thế nữa.
            </Typography>
            <Button fullWidth variant="contained" sx={{ backgroundColor: '#6366F1', textTransform: 'none', fontSize: '13px', py: 0.5, '&:hover': { backgroundColor: '#4F46E5' } }}>
              Nâng cấp ngay
            </Button>
          </Box>
        </Box>

        {/* Main Content Area */}
        {activeTab === 'rules' && <RulesContent />}
        {activeTab === 'button' && <ButtonContent />}
        {activeTab === 'scheduled' && <ScheduledContent />}
        {activeTab === 'webhooks' && <WebhooksContent />}
      </Box>
    </Dialog>
  )
}

export default BoardBarAutomationPopover
