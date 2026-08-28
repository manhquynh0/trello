import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import Pagination from '@mui/material/Pagination'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { toast } from 'react-toastify'

const initialMembers = [
  { id: 1, name: 'Quỳnh Mạnh', email: 'quynh.manh@qllo.com', role: 'Owner', joined: 'Jan 5, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Anh Trân', email: 'anh.tran@qllo.com', role: 'Admin', joined: 'Feb 10, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 3, name: 'Minh Lê', email: 'minh.le@qllo.com', role: 'Member', joined: 'Mar 3, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 4, name: 'Phương Nguyễn', email: 'phuong.nguyen@qllo.com', role: 'Member', joined: 'Mar 15, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 5, name: 'Khoa Đỗ', email: 'khoa.do@qllo.com', role: 'Viewer', joined: 'Apr 2, 2024', status: 'Invited', avatar: 'https://i.pravatar.cc/150?img=60' }
]

const getRoleColor = (role) => {
  switch (role) {
    case 'Owner': return { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }
    case 'Admin': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }
    case 'Member': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }
    case 'Viewer': return { bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af' }
    default: return { bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af' }
  }
}

const MembersTab = () => {
  const [members, setMembers] = useState(initialMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [openInviteModal, setOpenInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Member')

  const handleMenuClick = (event, member) => {
    setAnchorEl(event.currentTarget)
    setSelectedMember(member)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMember(null)
  }

  const handleRemoveMember = () => {
    if (selectedMember) {
      if (selectedMember.role === 'Owner') {
        toast.error('Không thể xóa Workspace Owner!')
      } else {
        setMembers(prev => prev.filter(m => m.id !== selectedMember.id))
        toast.success(`Đã xóa ${selectedMember.name} khỏi workspace`)
      }
    }
    handleMenuClose()
  }

  const handleInviteSubmit = () => {
    if (!inviteEmail.trim()) {
      toast.error('Vui lòng nhập Email!')
      return
    }
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      joined: 'Just now',
      status: 'Invited',
      avatar: `https://i.pravatar.cc/150?u=${inviteEmail}`
    }
    setMembers(prev => [newMember, ...prev])
    toast.success(`Đã gửi lời mời tới ${inviteEmail}`)
    setOpenInviteModal(false)
    setInviteEmail('')
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <Box sx={{ flex: 1, padding: 4, overflowY: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 0.5 }}>
            Members
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Manage members in your workspace and assign roles
          </Typography>
        </Box>
        {/* <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setOpenInviteModal(true)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}
        >
          Invite Member
        </Button> */}
      </Box>

      {/* Filter and Search Bar */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search members by name or email..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 320, flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <MenuItem value="All">All Roles</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Members Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Joined Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Không tìm thấy thành viên nào
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => {
                const roleStyle = getRoleColor(member.role)
                return (
                  <TableRow key={member.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={member.avatar} alt={member.name} sx={{ width: 38, height: 38 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.role}
                        size="small"
                        sx={{
                          backgroundColor: roleStyle.bg,
                          color: roleStyle.color,
                          fontWeight: 600,
                          borderRadius: '8px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      {member.joined}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.status}
                        size="small"
                        variant={member.status === 'Active' ? 'filled' : 'outlined'}
                        color={member.status === 'Active' ? 'success' : 'warning'}
                        sx={{ borderRadius: '8px', fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, member)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { toast.info('Tính năng đổi vai trò đang phát triển'); handleMenuClose() }}>
          Change Role
        </MenuItem>
        <MenuItem onClick={handleRemoveMember} sx={{ color: 'error.main' }}>
          Remove Member
        </MenuItem>
      </Menu>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
        <Pagination count={1} color="primary" />
      </Box>

      {/* Invite Member Modal */}
      <Dialog open={openInviteModal} onClose={() => setOpenInviteModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Invite Member to Workspace</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              size="small"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="user@example.com"
            />
            <FormControl fullWidth size="small">
              <Typography variant="caption" sx={{ mb: 0.5, color: 'text.secondary' }}>Role</Typography>
              <Select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Member">Member</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenInviteModal(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleInviteSubmit} variant="contained" color="primary">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MembersTab
