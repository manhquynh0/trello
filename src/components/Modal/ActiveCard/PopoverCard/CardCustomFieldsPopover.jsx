import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'

// Icons for fields
import TextFieldsIcon from '@mui/icons-material/TextFields'
import NumbersIcon from '@mui/icons-material/Numbers'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import LinkIcon from '@mui/icons-material/Link'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Checkbox from '@mui/material/Checkbox'

function CardCustomFieldsPopover({ anchorEl, isOpen, onClose }) {
  const fields = [
    { icon: <TextFieldsIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Client', type: 'text', value: 'Acme Inc.' },
    { icon: <NumbersIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Estimate (Hours)', type: 'number', value: '8' },
    { icon: <TaskAltIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Priority', type: 'select', value: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }}/> High</Box> },
    { icon: <CalendarMonthIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Sprint', type: 'select', value: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#9CA3AF' }}><CalendarMonthIcon fontSize="small" /> Sprint 3 (Sep 1 - Sep 14)</Box> },
    { icon: <PersonOutlineIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Assignee (Custom)', type: 'select', value: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Avatar src="https://i.pravatar.cc/150?img=11" sx={{ width: 18, height: 18 }}/> You</Box> },
    { icon: <CheckBoxOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Needs Review', type: 'checkbox', value: true },
    { icon: <LinkIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Reference Link', type: 'text', value: 'https://www.figma.com/file/abc123' },
    { icon: <AttachMoneyIcon fontSize="small" sx={{ color: '#9CA3AF' }} />, label: 'Budget', type: 'number', value: '500' },
  ]

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#111827', color: 'white', borderRadius: '12px', width: '560px', border: '1px solid #374151', padding: '16px' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoFixHighOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Custom Fields
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 3 }}>
        Add custom fields to store important information.
      </Typography>

      <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>Add a new field</Typography>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
        <Select
          value="text"
          size="small"
          sx={{ width: '130px', backgroundColor: '#1F2937', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}
        >
          <MenuItem value="text"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><TextFieldsIcon fontSize="small" /> Text</Box></MenuItem>
        </Select>
        <TextField
          fullWidth
          placeholder="Field name (e.g. Client, Sprint, Estimate...)"
          variant="outlined"
          size="small"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1F2937', color: 'white', borderRadius: '6px',
              '& fieldset': { borderColor: '#374151' },
              '&:hover fieldset': { borderColor: '#4B5563' },
              '&.Mui-focused fieldset': { borderColor: '#3B82F6' }
            },
            '& .MuiInputBase-input::placeholder': { color: '#6B7280', opacity: 1 }
          }}
        />
        <Button variant="contained" sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', px: 3, '&:hover': { backgroundColor: '#0284C7' } }}>
          Add field
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 2 }}>Your custom fields</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        {fields.map((f, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <DragIndicatorIcon sx={{ color: '#4B5563', cursor: 'grab', fontSize: '20px' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '160px' }}>
              {f.icon}
              <Typography sx={{ fontSize: '14px' }}>{f.label}</Typography>
            </Box>
            
            {f.type === 'text' || f.type === 'number' ? (
              <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', border: '1px solid #374151', p: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '14px', color: f.type === 'text' && f.value.startsWith('http') ? '#9CA3AF' : 'white' }}>{f.value}</Typography>
                {f.type === 'number' && <Box sx={{ display: 'flex', flexDirection: 'column' }}><Typography sx={{ fontSize: '10px', lineHeight: 1, color: '#9CA3AF', cursor: 'pointer' }}>▲</Typography><Typography sx={{ fontSize: '10px', lineHeight: 1, color: '#9CA3AF', cursor: 'pointer' }}>▼</Typography></Box>}
              </Box>
            ) : f.type === 'select' ? (
              <Box sx={{ flex: 1, backgroundColor: '#1F2937', borderRadius: '6px', border: '1px solid #374151', p: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <Box sx={{ fontSize: '14px' }}>{f.value}</Box>
                <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>▼</Typography>
              </Box>
            ) : f.type === 'checkbox' ? (
              <Box sx={{ flex: 1 }}>
                <Checkbox
                  checked={f.value}
                  size="small"
                  sx={{ color: '#4B5563', '&.Mui-checked': { color: '#0EA5E9' }, p: 0, ml: 1 }}
                />
              </Box>
            ) : null}

            <IconButton size="small" sx={{ color: '#9CA3AF' }}><EditIcon fontSize="small" /></IconButton>
            <IconButton size="small" sx={{ color: '#9CA3AF' }}><MoreHorizIcon fontSize="small" /></IconButton>
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        startIcon={<AddIcon />}
        sx={{ color: '#0EA5E9', border: '1px dashed #374151', textTransform: 'none', p: 1.5, borderRadius: '8px', '&:hover': { backgroundColor: '#1F2937', borderColor: '#4B5563' } }}
      >
        Add another custom field
      </Button>
    </Popover>
  )
}

export default CardCustomFieldsPopover
