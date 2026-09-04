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
import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'

function BoardBarFilterPopover({ anchorEl, isOpen, onClose }) {
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
            <FilterAltOutlinedIcon /> Filter Cards
          </Typography>
          <Typography sx={{ color: '#9CA3AF', fontSize: '14px', mt: 0.5 }}>
            Find cards that match your criteria.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#374151', borderColor: '#4B5563' } }}>
            Clear all
          </Button>
          <IconButton size="small" onClick={onClose} sx={{ color: '#9CA3AF' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>Search</Typography>
        <TextField
          fullWidth
          placeholder="Search cards..."
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
        <Typography sx={{ color: '#9CA3AF', fontSize: '12px' }}>Search by title, description, or content...</Typography>
      </Box>

      {/* Grid of filters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        {/* Column 1 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Members */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PersonOutlineIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Members
            </Typography>
            <Select value="all" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1.5, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="all">All members</MenuItem>
            </Select>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Avatar src="https://i.pravatar.cc/150?img=11" sx={{ width: 24, height: 24 }} />
              <Avatar src="https://i.pravatar.cc/150?img=12" sx={{ width: 24, height: 24 }} />
              <Avatar src="https://i.pravatar.cc/150?img=13" sx={{ width: 24, height: 24 }} />
              <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#9CA3AF' }}>+3</Box>
            </Box>
          </Box>

          {/* Due date */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarMonthIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Due date
            </Typography>
            <Select value="any" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Any time</MenuItem>
            </Select>
          </Box>

          {/* Card content */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <DescriptionOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Card content
            </Typography>
            <Select value="any" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Any content</MenuItem>
            </Select>
            <TextField
              fullWidth
              placeholder="Enter keyword..."
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
              <LocalOfferOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Labels
            </Typography>
            <Select value="all" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1.5, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="all">All labels</MenuItem>
            </Select>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ backgroundColor: '#EF4444', px: 1, py: 0.5, borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Bug</Box>
              <Box sx={{ backgroundColor: '#EAB308', px: 1, py: 0.5, borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>In Progress</Box>
              <Box sx={{ backgroundColor: '#22C55E', px: 1, py: 0.5, borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Done</Box>
              <Box sx={{ backgroundColor: '#A855F7', px: 1, py: 0.5, borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Feature</Box>
              <Box sx={{ backgroundColor: '#EC4899', px: 1, py: 0.5, borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Design</Box>
            </Box>
          </Box>

          {/* Checklist */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TaskAltOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Checklist
            </Typography>
            <Select value="any" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Any status</MenuItem>
            </Select>
          </Box>

          {/* Attachments */}
          <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AttachFileOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF', transform: 'rotate(45deg)' }} /> Attachments
            </Typography>
            <Select value="any" size="small" fullWidth sx={{ backgroundColor: '#111827', color: 'white', borderRadius: '6px', mb: 1, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
              <MenuItem value="any">Any</MenuItem>
            </Select>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5, '&.Mui-checked': { color: '#0EA5E9' } }} />
                <Typography sx={{ fontSize: '13px', color: '#9CA3AF' }}>Has attachments</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" sx={{ color: '#4B5563', p: 0.5, '&.Mui-checked': { color: '#0EA5E9' } }} />
                <Typography sx={{ fontSize: '13px', color: '#9CA3AF' }}>No attachments</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Custom fields */}
      <Box sx={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', p: 2, mb: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TuneOutlinedIcon fontSize="small" sx={{ color: '#9CA3AF' }} /> Custom fields
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Select value="any" size="small" sx={{ flex: 1, backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
            <MenuItem value="any">Any field</MenuItem>
          </Select>
          <Select value="any" size="small" sx={{ flex: 1, backgroundColor: '#111827', color: 'white', borderRadius: '6px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' }, '& .MuiSvgIcon-root': { color: '#9CA3AF' } }}>
            <MenuItem value="any">Any value</MenuItem>
          </Select>
          <TextField
            placeholder="Enter value..."
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
          Save as view
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} sx={{ color: 'white', borderColor: '#4B5563', textTransform: 'none', '&:hover': { backgroundColor: '#374151', borderColor: '#4B5563' } }}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<FilterAltOutlinedIcon />} sx={{ backgroundColor: '#0EA5E9', textTransform: 'none', '&:hover': { backgroundColor: '#0284C7' } }}>
            Apply filter
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default BoardBarFilterPopover
