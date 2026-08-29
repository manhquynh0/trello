
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import Tooltip from '@mui/material/Tooltip'
import { UpperCaseFirstLetter } from '~/utils/UpperCaseFirstLetter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
const MENU_STYLES = {
  padding: 1
}
function BoardBar({ board }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      bgcolor: '#0F1626',
      padding: '10px',
      overflowX: 'auto',
      gap: 2
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }} >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Tooltip title={board?.description} placement="top">
            <Chip
              icon={<GridViewRoundedIcon />}
              label={board?.title}
              clickable
              sx={MENU_STYLES}
            />
          </Tooltip>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Tooltip title={board?.title} placement="top">
            <Chip
              icon={<VpnLockIcon />}
              label={UpperCaseFirstLetter(board?.type)}
              clickable
              sx={MENU_STYLES}
            />
          </Tooltip>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Tooltip title={board?.title} placement="top">
            <Chip
              icon={<FlashOnIcon />}
              label="Automation"
              clickable
              sx={MENU_STYLES}
            />
          </Tooltip>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Chip
            icon={<AddToDriveIcon />}
            label="Add To Google Drive"
            clickable
            sx={MENU_STYLES}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Tooltip title={board?.title} placement="top">
            <Chip
              icon={<FilterAltRoundedIcon />}
              label="Filter"
              clickable
              sx={MENU_STYLES}
            />
          </Tooltip>
        </Box>

      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <InviteBoardUser boardId={board._id} />
        <BoardUserGroup boardUsers={board?.FE_allUser} />
      </Box>
    </Box >
  )
}

export default BoardBar