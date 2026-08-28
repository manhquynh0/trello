import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MapIcon from '@mui/icons-material/Map'
import SpeedIcon from '@mui/icons-material/Speed'
import BugReportIcon from '@mui/icons-material/BugReport'
import CampaignIcon from '@mui/icons-material/Campaign'
import EventIcon from '@mui/icons-material/Event'
import PersonIcon from '@mui/icons-material/Person'
import { toast } from 'react-toastify'

const initialTemplates = [
  {
    id: 'tpl_1',
    title: 'Project Management',
    category: 'Engineering',
    description: 'Structure complex projects into manageable tasks, deadlines, and milestones.',
    icon: <AccountTreeIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    boardCount: '1.4k teams'
  },
  {
    id: 'tpl_2',
    title: 'Content Calendar',
    category: 'Marketing',
    description: 'Plan, schedule, and review social media and blog content effortlessly.',
    icon: <CalendarMonthIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    boardCount: '980 teams'
  },
  {
    id: 'tpl_3',
    title: 'Product Roadmap',
    category: 'Product',
    description: 'Align your engineering team on product goals, features, and release schedules.',
    icon: <MapIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
    boardCount: '2.1k teams'
  },
  {
    id: 'tpl_4',
    title: 'Sprint Planning',
    category: 'Engineering',
    description: 'Agile framework setup with Backlog, In Progress, Review, and Done columns.',
    icon: <SpeedIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    boardCount: '3.5k teams'
  },
  {
    id: 'tpl_5',
    title: 'Bug Tracking',
    category: 'Engineering',
    description: 'Capture, categorize, and resolve software bugs systematically.',
    icon: <BugReportIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    boardCount: '1.1k teams'
  },
  {
    id: 'tpl_6',
    title: 'Marketing Campaign',
    category: 'Marketing',
    description: 'Coordinate campaign deliverables, ad assets, and influencer outreach.',
    icon: <CampaignIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
    boardCount: '870 teams'
  },
  {
    id: 'tpl_7',
    title: 'Event Planning',
    category: 'Operations',
    description: 'Organize speakers, catering, venues, and schedule for your next event.',
    icon: <EventIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    boardCount: '650 teams'
  },
  {
    id: 'tpl_8',
    title: 'Personal Organizer',
    category: 'Personal',
    description: 'Manage daily routines, habits, fitness goals, and personal notes.',
    icon: <PersonIcon sx={{ fontSize: 32, color: 'white' }} />,
    bg: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    boardCount: '4.2k users'
  }
]

const categories = ['All', 'Engineering', 'Marketing', 'Product', 'Operations', 'Personal']

const TemplatesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [newBoardName, setNewBoardName] = useState('')

  const filteredTemplates = initialTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleUseTemplate = () => {
    if (!newBoardName.trim()) {
      toast.error('Vui lòng nhập tên Board!')
      return
    }
    toast.success(`Đã tạo board "${newBoardName}" từ mẫu ${selectedTemplate.title}!`)
    setSelectedTemplate(null)
    setNewBoardName('')
  }

  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
          Templates
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Use pre-built templates to get your team started quickly
        </Typography>
      </Box>

      {/* Filter and Search Bar */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search templates..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 280, flex: 1 }}
        />

        {/* Category Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              sx={{ borderRadius: '16px', fontWeight: 600 }}
            />
          ))}
        </Box>
      </Box>

      {/* Template Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((tpl) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tpl.id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              {/* Header Gradient & Icon */}
              <Box
                sx={{
                  background: tpl.bg,
                  p: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ p: 1, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                  {tpl.icon}
                </Box>
                <Chip
                  label={tpl.category}
                  size="small"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 600 }}
                />
              </Box>

              {/* Card Body */}
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pt: 2.5 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {tpl.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 2 }}>
                    {tpl.description}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {tpl.boardCount}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setSelectedTemplate(tpl)
                      setNewBoardName(tpl.title)
                    }}
                    sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}
                  >
                    Use Template
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal to Use Template */}
      <Dialog open={Boolean(selectedTemplate)} onClose={() => setSelectedTemplate(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Create Board from Template
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Template: <strong>{selectedTemplate?.title}</strong>
            </Typography>
            <TextField
              label="Board Name"
              fullWidth
              size="small"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="e.g. My New Sprint"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setSelectedTemplate(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleUseTemplate} variant="contained">
            Create Board
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TemplatesTab
