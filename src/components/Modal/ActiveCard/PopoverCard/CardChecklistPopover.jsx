import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinearProgress from '@mui/material/LinearProgress'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'



function CardChecklistPopover({ anchorEl, isOpen, onClose }) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const onCreateCheckList = () => {
    console.log(1)
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
            <CheckCircleIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Checklist
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mb: 2 }}>
          Chia nhỏ công việc thành các bước nhỏ hơn và theo dõi tiến độ.
        </Typography>

        {/* UI Design Checklist */}
        <Box sx={{ backgroundColor: '#1F2937', borderRadius: '8px', p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DragIndicatorIcon sx={{ color: '#6B7280', fontSize: '18px', mr: 1, cursor: 'grab' }} />
            <RadioButtonUncheckedIcon sx={{ color: '#6B7280', fontSize: '20px', mr: 1 }} />
            <Typography sx={{ fontWeight: 600, flex: 1 }}>UI Design</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mr: 1 }}>3 / 5</Typography>
            <IconButton size="small" sx={{ color: '#9CA3AF', p: 0 }}><MoreHorizIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pl: 3 }}>
            <LinearProgress variant="determinate" value={60} sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: '#374151', '& .MuiLinearProgress-bar': { backgroundColor: '#0EA5E9' } }} />
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>60%</Typography>
          </Box>

          <Button startIcon={<AddIcon />} sx={{ color: '#0EA5E9', textTransform: 'none', pl: 3, mt: 1, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
            Add an item
          </Button>
        </Box>

        {/* Development Checklist */}
        <Box sx={{ backgroundColor: '#1F2937', borderRadius: '8px', p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DragIndicatorIcon sx={{ color: '#6B7280', fontSize: '18px', mr: 1, cursor: 'grab' }} />
            <RadioButtonUncheckedIcon sx={{ color: '#6B7280', fontSize: '20px', mr: 1 }} />
            <Typography sx={{ fontWeight: 600, flex: 1 }}>Development</Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '12px', mr: 1 }}>1 / 4</Typography>
            <IconButton size="small" sx={{ color: '#9CA3AF', p: 0 }}><MoreHorizIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LinearProgress variant="determinate" value={25} sx={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: '#374151', '& .MuiLinearProgress-bar': { backgroundColor: '#22C55E' } }} />
            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>25%</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Checkbox {...label} defaultChecked />
            <Typography sx={{ fontSize: '14px', color: 'white' }}>Setup project</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Checkbox {...label} defaultChecked />
            <Typography sx={{ fontSize: '14px', color: 'white' }}>Setup project</Typography>
          </Box>



          <Button startIcon={<AddIcon />} onClick={onCreateCheckList} sx={{ color: '#0EA5E9', textTransform: 'none', pl: 3, mt: 1, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
            Thêm nhiệm vụ
          </Button>
        </Box>

        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={onCreateCheckList}
          sx={{ color: '#9CA3AF', backgroundColor: '#1F2937', textTransform: 'none', justifyContent: 'flex-start', '&:hover': { backgroundColor: '#374151' } }}
        >
          Thêm danh sách kiểm tra
        </Button>
      </Box>
    </Popover>
  )
}

export default CardChecklistPopover
