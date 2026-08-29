import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { toast } from 'react-toastify'
import { undoBoardApi, deleteBoardApi } from '~/apis'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentBoards, fetchBoardsAPI } from '~/redux/activeBoard/activeBoardSlice'
import ReplayIcon from '@mui/icons-material/Replay';
import moment from 'moment'
import { confirm } from '~/utils/ConfirmDialog'

const TrashTab = () => {
  const dispatch = useDispatch()
  const boards = useSelector(selectCurrentBoards)
  const [openEmptyConfirm, setOpenEmptyConfirm] = useState(false)

  React.useEffect(() => {
    dispatch(fetchBoardsAPI('?q[type]=trash'))
  }, [dispatch])

  const handleRestore = (board) => {
    undoBoardApi(board._id).then(() => {
      dispatch(fetchBoardsAPI('?q[type]=trash'))
    })
  }

  const handleDeletePermanently = async (board) => {
    const result = await confirm(
      `Bạn có chắc muốn xóa vĩnh viễn ${board.title} này?`,
      'Xóa vĩnh viễn board'
    )
    if (!result.isConfirmed) return

    await deleteBoardApi(board._id).then(() => {
      dispatch(fetchBoardsAPI('?q[type]=trash'))
    })
  }

  const handleEmptyTrash = () => {
    setOpenEmptyConfirm(false)
    toast.success('Đã dọn sạch thùng rác!')
  }


  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            Thùng rác
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Các board và mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày
          </Typography>
        </Box>
        {boards.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenEmptyConfirm(true)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Xóa tất cả
          </Button>
        )}
      </Box>

      {/* Trash Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Tên</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Loại</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Xóa bởi</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Xóa lúc</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Hết hạn trong</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <DeleteIcon sx={{ fontSize: 50, color: 'text.secondary', opacity: 0.4, mb: 1 }} />
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Thùng rác trống
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    Không có board hoặc mục nào bị xóa trong thùng rác.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              boards.filter((board) => board._destroy === true).map((board) => (
                <TableRow key={board._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {board.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={board.type === 'public' ? 'Công khai' : 'Riêng tư'} size="small" variant="outlined" sx={{ borderRadius: '8px', fontWeight: 500 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={board.avatar} alt={board.deletedBy} sx={{ width: 28, height: 28 }} />
                      <Typography variant="body2">{board.deletedBy}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    {moment(board.deletedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip label={`Còn ${moment(board.deletedAt)
                      .add(30, 'days')
                      .diff(moment(), 'days')} ngày`} size="small" color="warning" sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Khôi phục">
                      <IconButton color="primary" onClick={() => handleRestore(board)} size="small" sx={{ mr: 1 }}>
                        <ReplayIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa vĩnh viễn">
                      <IconButton color="error" onClick={() => handleDeletePermanently(board)} size="small">
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Empty Trash */}
      <Dialog open={openEmptyConfirm} onClose={() => setOpenEmptyConfirm(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
          Dọn sạch thùng rác?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Hành động này sẽ xóa vĩnh viễn tất cả các mục trong thùng rác và không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenEmptyConfirm(false)} color="inherit">
            Hủy
          </Button>
          <Button onClick={handleEmptyTrash} variant="contained" color="error">
            Xóa vĩnh viễn tất cả
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TrashTab
