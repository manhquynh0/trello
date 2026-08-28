import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ListIcon from '@mui/icons-material/List'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { useLocation } from 'react-router-dom'
import { fetchBoardsApi, updateBoardDetaislApi, deleteBoardApi } from '~/apis/index'
import { useSearchParams, Link } from 'react-router-dom'
import { DEFAULT_ITEM_PERPAGE, DEFAULT_PAGE } from '~/utils/constants'
import PaginationItem from '@mui/material/PaginationItem'
import { confirm } from '~/utils/ConfirmDialog'
import { toast } from 'react-toastify'

const BoardsTab = ({ refreshKey }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1', 10)
  // Lấy từ khóa tìm kiếm từ URL (nếu có) để hiển thị lên tiêu đề
  const searchKeyword = searchParams.get('q[title]') || ''
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [activeMenuBoardId, setActiveMenuBoardId] = React.useState(null)
  const [boards, setBoards] = React.useState(null)
  const [totalBoards, setTotalBoards] = React.useState(null)
  const [totalFavoriteBoards, setTotalFavoriteBoards] = React.useState(null)
  const [totalPublicBoards, setTotalPublicBoards] = React.useState(null)
  const [totalPrivateBoards, setTotalPrivateBoards] = React.useState(null)
  const location = useLocation()

  const handleClick = (event, boardId) => {
    setAnchorEl(event.currentTarget)
    setActiveMenuBoardId(boardId)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setActiveMenuBoardId(null)
  }


  React.useEffect(() => {
    fetchBoardsApi(location.search).then(res => {
      setBoards(res.boards || []),
        setTotalBoards(res.totalBoards || 0),
        setTotalFavoriteBoards(res.totalFavoriteBoards || 0),
        setTotalPublicBoards(res.totalPublicBoards || 0),
        setTotalPrivateBoards(res.totalPrivateBoards || 0)
    })
  }, [location.search, refreshKey])
  const handleFavorite = (board) => {
    updateBoardDetaislApi(board._id, { isFavorite: !board.isFavorite }).then(() => {
      setBoards(prev => prev.map(b => b._id === board._id ? { ...b, isFavorite: !b.isFavorite } : b))
    })
  }

  // const sortBy = searchParams.get('q[sort]')
  const handleSort = (e) => {
    const select = e.target.value
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev)
      updated.set('q[sort]', select)
      return updated
    })
  }
  const filterFavorite = () => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev)
      updated.set('q[type]', 'favorite')
      return updated
    })
  }
  const filterPublic = () => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev)
      updated.set('q[type]', 'public')
      return updated
    })
  }
  const filterPrivate = () => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev)
      updated.set('q[type]', 'private')
      return updated
    })
  }
  const onHandleDelete = async (board) => {
    handleClose()
    const result = await confirm(
      `Bạn có chắc muốn xóa board "${board.title}" này?`, 'Xóa board'
    )

    if (result.isConfirmed) {
      await deleteBoardApi(board._id).then((res) => {
        console.log(res)
        setBoards(prev => prev.filter(b => b._id !== board._id))
        toast.success('Deleted Successfully', {
          style: {
            borderRadius: '12px',
            background: '#16A34A',
            color: '#fff'
          },
          icon: () => (
            <span style={{ color: '#fff', fontSize: '20px' }}>✓</span>
          )
        })

      })

    }

  }

  return (
    <Box
      sx={{
        flex: 1,
        padding: 4,
        overflowY: 'auto'
      }}
    >

      {/* Header Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
          {searchKeyword ? `Kết quả tìm kiếm: "${searchKeyword}"` : 'Your Boards'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {searchKeyword
            ? `Tìm thấy ${totalBoards} board phù hợp`
            : 'Tạo, quản lý và theo dõi tất cả board của bạn'
          }
        </Typography>
      </Box>

      {/* Filter and Sort Section */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        {/* Filter Chips */}
        <Box sx={{
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
          paddingRight: 2
        }}>
          <Chip
            label={`Tất cả (${totalBoards})`}
            variant="filled"
            clickable
            onClick={() => {
              setSearchParams({})

            }}
            sx={{
              height: 38,
              borderRadius: '20px',
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
              '& .MuiChip-label': {
                px: 2.5
              }
            }}
          />
          <Chip
            label={`Yêu thích (${totalFavoriteBoards})`}
            clickable
            onClick={filterFavorite}
            deleteIcon={
              <FavoriteIcon
                sx={{
                  color: '#FFC107',
                  fontSize: 20
                }}
              />
            }
            onDelete={() => { }}
            variant="outlined"
            sx={{
              height: 38,
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              '& .MuiChip-label': {
                pl: 2.5,
                pr: 1.5
              },
              '& .MuiChip-deleteIcon': {
                color: '#FFC107',
                mr: 1,
                '&:hover': {
                  color: '#FFB300'
                }
              },
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          />
          <Chip
            label={`Cá nhân (${totalPrivateBoards})`}
            clickable
            onClick={filterPrivate}
            variant="outlined"
            sx={{
              height: 38,
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              '& .MuiChip-label': {
                px: 2.5
              },
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          />
          <Chip
            clickable
            label={`Nhóm (${totalPublicBoards})`}
            onClick={filterPublic}
            variant="outlined"
            sx={{
              height: 38,
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
              color: 'text.primary',
              '& .MuiChip-label': {
                px: 2.5
              },
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          />
        </Box>

        {/* Sort and View Options */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              // value={sortBy}
              label="Filter"
              onChange={handleSort}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="name">Name A-Z</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Grid view">
            <IconButton size="small">
              <WidgetsRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="List view">
            <IconButton size="small">
              <ListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Boards Grid */}
      {boards !== null && boards?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            Không tìm thấy board nào{searchKeyword ? ` với từ khóa "${searchKeyword}"` : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Thử tìm kiếm với từ khóa khác hoặc tạo board mới
          </Typography>
        </Box>
      )}
      {boards?.length > 0 &&
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {boards.map((board) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={board._id}
            >
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
                {/* Card Image */}
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={board.image ? board.image : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop'}
                    alt={board.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  {/* More Menu Button */}
                  <IconButton
                    size="small"
                    onClick={(e) => handleClick(e, board._id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                  >
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>

                  {/* Menu Dropdown */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && activeMenuBoardId === board._id}
                    onClose={handleClose}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <ContentCopy fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Copy</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentPaste fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Paste</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => onHandleDelete(board)}
                      sx={{
                        '&:hover': {
                          color: 'error.main'
                        }
                      }}
                    >
                      <ListItemIcon>
                        <DeleteRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ paddingBottom: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      marginBottom: 0.5
                    }}
                  >
                    {board.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
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
                      marginBottom: 1,

                      '&:hover': {
                        color: 'primary.dark',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Xem chi tiết →
                  </Typography>


                </CardContent>
                {/* Card Actions */}
                <CardActions sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.75rem' } }}>
                    {board?.members?.map((member, index) => (

                      <Tooltip
                        key={index}
                        title={member?.displayName}
                        placement="top"
                        arrow
                      >
                        <Avatar
                          key={index}
                          src={member?.avatar}
                          alt={member?.displayName}
                          sx={{ width: 32, height: 32 }}
                        />
                      </Tooltip>

                    ))}
                  </AvatarGroup>
                  <IconButton
                    size="small"
                    sx={{
                      color: board?.isFavorite ? '#FFC107' : 'inherit'
                    }}
                  >
                    <FavoriteIcon
                      onClick={() => handleFavorite(board)}
                      fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      }

      {/* Pagination */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4
      }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Hiển thị {(page - 1) * DEFAULT_ITEM_PERPAGE + 1} tới {Math.min(page * DEFAULT_ITEM_PERPAGE, totalBoards)} của {totalBoards}
        </Typography>
        <Stack spacing={2} direction="row">
          <Pagination

            count={Math.ceil(totalBoards / DEFAULT_ITEM_PERPAGE)}
            page={page}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
              />
            )}
          />
        </Stack>
      </Box>

    </Box>
  )
}


export default BoardsTab