import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialRecentBoards = [
  {
    _id: 'rec_1',
    title: 'Project Management',
    description: 'Track milestones, tasks, and daily sprint progress.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
    isFavorite: true,
    lastAccessed: 'Updated 2 minutes ago',
    members: [
      { displayName: 'Quỳnh Mạnh', avatar: 'https://i.pravatar.cc/150?img=11' },
      { displayName: 'Anh Trân', avatar: 'https://i.pravatar.cc/150?img=32' },
      { displayName: 'Minh Lê', avatar: 'https://i.pravatar.cc/150?img=13' }
    ]
  },
  {
    _id: 'rec_2',
    title: 'Website Redesign',
    description: 'UX/UI revamping, design system & frontend implementation.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop',
    isFavorite: true,
    lastAccessed: 'Updated 1 hour ago',
    members: [
      { displayName: 'Phương Nguyễn', avatar: 'https://i.pravatar.cc/150?img=47' },
      { displayName: 'Khoa Đỗ', avatar: 'https://i.pravatar.cc/150?img=60' }
    ]
  },
  {
    _id: 'rec_3',
    title: 'Q3 Marketing Plan',
    description: 'Social media strategy, SEO content, and ad campaigns.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=300&fit=crop',
    isFavorite: false,
    lastAccessed: 'Updated 3 hours ago',
    members: [
      { displayName: 'Quỳnh Mạnh', avatar: 'https://i.pravatar.cc/150?img=11' },
      { displayName: 'Anh Trân', avatar: 'https://i.pravatar.cc/150?img=32' },
      { displayName: 'Khoa Đỗ', avatar: 'https://i.pravatar.cc/150?img=60' },
      { displayName: 'Minh Lê', avatar: 'https://i.pravatar.cc/150?img=13' }
    ]
  },
  {
    _id: 'rec_4',
    title: 'Personal Tasks',
    description: 'Personal goals, learning path, and reading list.',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop',
    isFavorite: false,
    lastAccessed: 'Updated 5 hours ago',
    members: [
      { displayName: 'Quỳnh Mạnh', avatar: 'https://i.pravatar.cc/150?img=11' }
    ]
  }
]

const RecentlyTab = () => {
  const [recentBoards, setRecentBoards] = useState(initialRecentBoards)

  const toggleFavorite = (boardId) => {
    setRecentBoards(prev => prev.map(b => b._id === boardId ? { ...b, isFavorite: !b.isFavorite } : b))
    toast.success('Đã cập nhật bảng yêu thích!')
  }

  const handleClearHistory = () => {
    setRecentBoards([])
    toast.info('Đã xóa lịch sử xem gần đây')
  }

  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            Recently Viewed
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Quickly access boards you have opened or edited recently
          </Typography>
        </Box>
        {recentBoards.length > 0 && (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<DeleteSweepIcon />}
            onClick={handleClearHistory}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Clear History
          </Button>
        )}
      </Box>

      {/* Boards Grid */}
      {recentBoards.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AccessTimeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            Chưa có lịch sử xem gần đây
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Các board bạn truy cập sẽ xuất hiện tại đây để truy cập nhanh chóng.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recentBoards.map((board) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={board._id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                {/* Image & Timestamp */}
                <Box sx={{ position: 'relative', height: 160 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={board.image}
                    alt={board.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      px: 1.2,
                      py: 0.4,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.75rem',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    {board.lastAccessed}
                  </Box>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {board.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', minHeight: 40 }}>
                    {board.description}
                  </Typography>
                  <Typography
                    component={Link}
                    to={`/boards/${board._id}`}
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      color: 'primary.main',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      mt: 1,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Mở Board →
                  </Typography>
                </CardContent>

                {/* Card Actions */}
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.7rem' } }}>
                    {board.members.map((member, idx) => (
                      <Tooltip key={idx} title={member.displayName}>
                        <Avatar src={member.avatar} alt={member.displayName} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                  <IconButton size="small" onClick={() => toggleFavorite(board._id)}>
                    {board.isFavorite ? (
                      <FavoriteIcon fontSize="small" sx={{ color: '#FFC107' }} />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default RecentlyTab
