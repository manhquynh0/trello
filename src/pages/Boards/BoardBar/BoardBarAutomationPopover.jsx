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

const TemplateCard = ({ icon, title, desc, btnText = 'Use template' }) => (
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
    {/* Rules List */}
    <Box sx={{ width: '380px', borderRight: '1px solid #374151', p: 3, display: 'flex', flexDirection: 'column', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Rules (3)</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', px: 2, '&:hover': { backgroundColor: '#0284C7' } }}>
          Create rule
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search rules..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': { backgroundColor: '#111827', color: 'white', '& fieldset': { borderColor: '#374151' } },
            '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1, fontSize: '13px' }
          }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6B7280', fontSize: '18px' }} /></InputAdornment> }}
        />
        <Select value="all" size="small" sx={{ width: '120px', backgroundColor: '#111827', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="all">All status</MenuItem>
        </Select>
      </Box>

      <RuleCard
        switchOn={true}
        title="Move to Done when checklist completed"
        conditions={[
          { icon: <CheckCircleOutlineIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'When checklist is completed' },
          { icon: <ArrowForwardIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'Move card to Done' }
        ]}
        tags={['Checklist', 'Move']}
        updated="Updated 2 hours ago"
      />
      <RuleCard
        switchOn={true}
        iconColor="#3B82F6"
        title="Add member when card is created"
        conditions={[
          { icon: <CheckCircleOutlineIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'When a card is created' },
          { icon: <PersonOutlineIcon sx={{ color: '#3B82F6', fontSize: '18px' }} />, text: 'Add member: Me' }
        ]}
        tags={['Card', 'Member']}
        updated="Updated 1 day ago"
      />
      <RuleCard
        switchOn={false}
        iconColor="#9CA3AF"
        title="Notify 1 day before due date"
        conditions={[
          { icon: <CalendarMonthIcon sx={{ color: '#22C55E', fontSize: '18px' }} />, text: 'When due date is 1 day before' },
          { icon: <NotificationsNoneIcon sx={{ color: '#3B82F6', fontSize: '18px' }} />, text: 'Send notification to card members' }
        ]}
        tags={['Due date', 'Notification']}
        updated="Updated 3 days ago"
      />
    </Box>

    {/* Create Form */}
    <Box sx={{ width: '420px', borderRight: '1px solid #374151', p: 3, display: 'flex', flexDirection: 'column', backgroundColor: '#1F2937', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FlashOnIcon sx={{ color: '#9CA3AF' }} />
        <Typography sx={{ fontWeight: 600, fontSize: '16px', flex: 1 }}>Create automation rule</Typography>
        <IconButton size="small" sx={{ color: '#9CA3AF' }}><CloseIcon fontSize="small" /></IconButton>
      </Box>

      <Box sx={{ backgroundColor: '#111827', p: 2, borderRadius: '8px', border: '1px solid #374151', mb: 2 }}>
        <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Rule name</Typography>
        <TextField
          fullWidth
          value="Move to Done when checklist completed"
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
            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>When</Typography>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Choose the trigger that starts the automation.</Typography>
          </Box>
        </Box>
        <Select value="check" size="small" fullWidth sx={{ backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="check"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><TaskAltIcon fontSize="small" /> Checklist is completed</Box></MenuItem>
        </Select>
      </Box>

      <Box sx={{ backgroundColor: '#111827', p: 2, borderRadius: '8px', border: '1px solid #374151', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
          <ArrowForwardIcon sx={{ color: '#3B82F6' }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Then</Typography>
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Choose the action to perform.</Typography>
          </Box>
        </Box>
        <Select value="move" size="small" fullWidth sx={{ mb: 2, backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="move"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><DashboardIcon fontSize="small" /> Move card to column</Box></MenuItem>
        </Select>
        <Typography sx={{ fontSize: '12px', color: '#9CA3AF', mb: 0.5 }}>Select column</Typography>
        <Select value="done" size="small" fullWidth sx={{ mb: 3, backgroundColor: '#1F2937', color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
          <MenuItem value="done"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 14, height: 14, borderRadius: '2px', backgroundColor: '#22C55E' }} /> Done</Box></MenuItem>
        </Select>
        <Button startIcon={<AddIcon />} sx={{ color: '#60A5FA', textTransform: 'none', backgroundColor: '#1E3A8A40', '&:hover': { backgroundColor: '#1E3A8A60' } }}>
          Add another action
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SettingsOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Options <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5 }} />
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Only apply to cards with specific labels</Typography>
            <Select value="none" size="small" fullWidth sx={{ backgroundColor: '#111827', color: '#9CA3AF', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="none"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalOfferOutlinedIcon fontSize="small" /> Select labels...</Box></MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5 }} />
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography sx={{ fontSize: '13px', color: '#D1D5DB', mb: 1 }}>Only apply to cards with specific members</Typography>
            <Select value="none" size="small" fullWidth sx={{ backgroundColor: '#111827', color: '#9CA3AF', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="none"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PersonOutlineIcon fontSize="small" /> Select members...</Box></MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 'auto', pt: 2, borderTop: '1px solid #374151' }}>
        <Button variant="outlined" sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none' }}>Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Create rule</Button>
      </Box>
    </Box>

    {/* Templates */}
    <Box sx={{ width: '320px', p: 3, overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#4B5563', borderRadius: '4px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Templates</Typography>
        <Typography sx={{ color: '#60A5FA', fontSize: '13px', cursor: 'pointer' }}>View all</Typography>
      </Box>

      <TemplateCard icon={<CheckCircleOutlineIcon sx={{ color: '#22C55E' }} />} title="Move card when checklist completed" desc="When checklist is completed → Move card to another column" />
      <TemplateCard icon={<CalendarMonthIcon sx={{ color: '#EC4899' }} />} title="Set due date when moved" desc="When card is moved to a column → Set due date" />
      <TemplateCard icon={<PersonOutlineIcon sx={{ color: '#60A5FA' }} />} title="Add member when card is created" desc="When a card is created → Add member" />
      <TemplateCard icon={<LocalOfferOutlinedIcon sx={{ color: '#F43F5E' }} />} title="Add label when moved" desc="When card is moved → Add label" />
      <TemplateCard icon={<NotificationsNoneIcon sx={{ color: '#FACC15' }} />} title="Notify before due date" desc="When due date is X days away → Send notification" />

      <Box sx={{ mt: 4, p: 2, border: '1px solid #374151', borderRadius: '8px', backgroundColor: '#111827' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 2 }}>Need inspiration?</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LightbulbOutlinedIcon sx={{ color: '#FACC15', fontSize: '32px' }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', mb: 0.5 }}>Save time with automation</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mb: 1, lineHeight: 1.4 }}>Automate repetitive tasks and focus on what matters.</Typography>
            <Typography sx={{ color: '#60A5FA', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Learn more <ArrowForwardIcon sx={{ fontSize: '14px', ml: 0.5 }} /></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
)

const ButtonContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <PlayArrowIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Button Rules</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Create buttons that perform multiple actions at once when clicked. Add buttons to cards or the board top bar.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Create button</Button>
  </Box>
)

const ScheduledContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <WatchLaterOutlinedIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Scheduled Rules</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Set up rules to run automatically at specific times, like every Monday at 9AM or on the 1st of every month.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Create scheduled rule</Button>
  </Box>
)

const WebhooksContent = () => (
  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, flexDirection: 'column' }}>
    <WebhookIcon sx={{ fontSize: 60, color: '#4B5563', mb: 2 }} />
    <Typography sx={{ fontSize: '20px', fontWeight: 600, mb: 1 }}>Webhooks</Typography>
    <Typography sx={{ color: '#9CA3AF', mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Send HTTP requests to other services when specific events happen in your Trello boards.
    </Typography>
    <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none' }}>Create webhook</Button>
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
            <Typography sx={{ fontWeight: 600, fontSize: '22px' }}>Automation</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mt: 0.5 }}>
              Let Qllo do the work for you. Create rules to automatically manage your cards.
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
          <SidebarItem icon={<FormatListBulletedIcon fontSize="small" />} label="Rules" badge="3" active={activeTab === 'rules'} onClick={() => setActiveTab('rules')} />
          <SidebarItem icon={<PlayArrowIcon fontSize="small" />} label="Button" badge="2" active={activeTab === 'button'} onClick={() => setActiveTab('button')} />
          <SidebarItem icon={<WatchLaterOutlinedIcon fontSize="small" />} label="Scheduled" badge="1" active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')} />
          <SidebarItem icon={<WebhookIcon fontSize="small" />} label="Webhooks" badge="0" active={activeTab === 'webhooks'} onClick={() => setActiveTab('webhooks')} />

          <Box sx={{ my: 2, borderBottom: '1px solid #374151' }} />

          <SidebarItem icon={<AutoAwesomeOutlinedIcon fontSize="small" />} label="Templates" active={false} onClick={() => { }} />
          <SidebarItem icon={<FormatListBulletedIcon fontSize="small" />} label="Activity log" active={false} onClick={() => { }} />

          <Box sx={{ mt: 'auto', p: 2, backgroundColor: '#1F2937', borderRadius: '8px', border: '1px solid #374151' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#FACC15' }}>
              👑 Upgrade to Pro
            </Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '11px', mb: 2, lineHeight: 1.4 }}>
              Get advanced automation, multiple conditions and more.
            </Typography>
            <Button fullWidth variant="contained" sx={{ backgroundColor: '#6366F1', textTransform: 'none', fontSize: '13px', py: 0.5, '&:hover': { backgroundColor: '#4F46E5' } }}>
              Upgrade now
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
