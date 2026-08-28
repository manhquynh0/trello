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
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { toast } from 'react-toastify'

const initialTrashItems = [
  { id: 'tr_1', name: 'Old Project Plan', type: 'Board', deletedBy: 'Quỳnh Mạnh', avatar: 'https://i.pravatar.cc/150?img=11', deletedAt: 'May 10, 2024', expiresIn: '23 days' },
  { id: 'tr_2', name: 'Marketing Ideas', type: 'Board', deletedBy: 'Anh Trân', avatar: 'https://i.pravatar.cc/150?img=32', deletedAt: 'May 3, 2024', expiresIn: '21 days' },
  { id: 'tr_3', name: 'Sprint 1', type: 'Board', deletedBy: 'Minh Lê', avatar: 'https://i.pravatar.cc/150?img=13', deletedAt: 'May 5, 2024', expiresIn: '18 days' },
  { id: 'tr_4', name: 'Design System v1', type: 'Board', deletedBy: 'Phương Nguyễn', avatar: 'https://i.pravatar.cc/150?img=47', deletedAt: 'May 1, 2024', expiresIn: '14 days' }
]

const TrashTab = () => {
  const [trashItems, setTrashItems] = useState(initialTrashItems)
  const [openEmptyConfirm, setOpenEmptyConfirm] = useState(false)

  const handleRestore = (item) => {
    setTrashItems(prev => prev.filter(i => i.id !== item.id))
    toast.success(`Đã khôi phục "${item.name}"!`)
  }

  const handleDeletePermanently = (item) => {
    setTrashItems(prev => prev.filter(i => i.id !== item.id))
    toast.info(`Đã xóa vĩnh viễn "${item.name}"`)
  }

  const handleEmptyTrash = () => {
    setTrashItems([])
    setOpenEmptyConfirm(false)
    toast.success('Đã dọn sạch thùng rác!')
  }

  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            Trash
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Boards and items in trash will be permanently deleted after 30 days
          </Typography>
        </Box>
        {trashItems.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenEmptyConfirm(true)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Empty Trash
          </Button>
        )}
      </Box>

      {/* Trash Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Deleted By</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Deleted At</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Expires In</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trashItems.length === 0 ? (
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
              trashItems.map((item) => (
                <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={item.type} size="small" variant="outlined" sx={{ borderRadius: '8px', fontWeight: 500 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={item.avatar} alt={item.deletedBy} sx={{ width: 28, height: 28 }} />
                      <Typography variant="body2">{item.deletedBy}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    {item.deletedAt}
                  </TableCell>
                  <TableCell>
                    <Chip label={item.expiresIn} size="small" color="warning" sx={{ borderRadius: '8px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Khôi phục">
                      <IconButton color="primary" onClick={() => handleRestore(item)} size="small" sx={{ mr: 1 }}>
                        <RestoreFromTrashIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa vĩnh viễn">
                      <IconButton color="error" onClick={() => handleDeletePermanently(item)} size="small">
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
