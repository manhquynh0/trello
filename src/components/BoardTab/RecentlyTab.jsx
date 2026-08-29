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
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchBoardsApi, updateBoardDetaislApi } from '~/apis'
import moment from 'moment'
import { selectCurrentBoards, fetchBoardsAPI } from '~/redux/activeBoard/activeBoardSlice'
import { useSelector, useDispatch } from 'react-redux'
const RecentlyTab = () => {
  const location = useLocation()
  const boards = useSelector(selectCurrentBoards)
  const dispatch = useDispatch()

  React.useEffect(() => {
    fetchBoardsApi(location.search).then(res => {
      dispatch(fetchBoardsAPI(location.search))
    })
  }, [location.search])

  const toggleFavorite = (board) => {
    updateBoardDetaislApi(board._id, { isFavorite: !board.isFavorite }).then(() => {
      dispatch(fetchBoardsAPI(location.search))
    })
    toast.success('Đã cập nhật bảng yêu thích!')
  }

  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            Xem gần đây
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Truy cập nhanh các bảng bạn đã mở hoặc chỉnh sửa gần đây
          </Typography>
        </Box>
      </Box>

      {/* Boards Grid */}
      {boards.length === 0 ? (
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
          {boards?.slice(0, 4)?.map((board) => (
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
                    image={board.cover ? board.cover : 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=500&h=300&fit=crop'}
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
                    {moment(board.updatedAt).fromNow()}
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
                  <IconButton size="small" onClick={() => toggleFavorite(board)}>
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
