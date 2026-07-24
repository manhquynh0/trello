
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
const MENU_STYLES = {
  padding: '6px'
}
function BoardBar() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(144, 202, 249, 0.16)',
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
          <Chip
            icon={<GridViewRoundedIcon />}
            label="ManhQuynhDev"
            clickable
            sx={MENU_STYLES}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Chip
            icon={<VpnLockIcon />}
            label="Public/Private WorkSpcae"
            clickable
            sx={MENU_STYLES}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} >
          <Chip
            icon={<FlashOnIcon />}
            label="Automation"
            clickable
            sx={MENU_STYLES}
          />
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
          <Chip
            icon={<FilterAltRoundedIcon />}
            label="Filter"
            clickable
            sx={MENU_STYLES}
          />
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Button
          startIcon={<PersonAddAlt1Icon sx={{ color: 'inherit' }} />}
          variant="contained"
          color="success"
          sx={{
            backgroundColor: '#16A34A', // màu mặc định khi chưa hover
            '&:hover': {
              backgroundColor: '#22C55E'// sáng hơn khi hover
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup max={7}
          sx={{
            '& .MuiAvatar-root': {
              width: 33,
              height: 34,
              fontSize: '16px'
            }
          }}>
          <Tooltip title="Nghia Ngao" placement="top">
            <Avatar alt="Nghia Ngao" src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/673022166_1913278385986249_8351059440825815585_n.jpg?stp=dst-jpg_tt6&cstp=mx1532x1526&ctp=s200x200&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Gh753Pz7awsQ7kNvwGmCc41&_nc_oc=AdpOU24XvJtYfFwlAwAYUYXYB3AgtJuEYV8QTOMyg3L3fnrAbRPb6k9_KWzv7SMTATU&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=F2Gd1ykVaJU34UtLpmp5AA&_nc_ss=7b2a8&oh=00_AQBBw71oVg_Af1NFVvbU1yE2_tzQYU2KJN0FGcGC_2-X_g&oe=6A688701" />
          </Tooltip>
          <Tooltip title="ManhQuynhDev" placement="top">
            <Avatar alt="ManhQuynhDev" src="https://avatars.githubusercontent.com/u/167176471?v=4" />
          </Tooltip>
          <Tooltip title="Huấn Hoa Hồng" placement="top">
            <Avatar alt="Huấn Hoa Hồng" src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.99422-6/751720205_1499971195488877_4339621872646181298_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-UKCF2085awQ7kNvwG4-ELm&_nc_oc=Adpy_KsWFxBgK0e2kSCz1m6pCybTu8NPD09BhTb7c4QkzrrtYcpD3-nQYiEPwXLbmOA&_nc_zt=14&_nc_ht=scontent.fhan18-1.fna&_nc_gid=VNtrNBs_y5plkvcab2XQbQ&_nc_ss=7b2a8&oh=00_AQCS6VqdaMG05Y_ufwCk2f3GObRudPCyE1sOCGTT_AGb6Q&oe=6A68AF92" />
          </Tooltip>
          <Tooltip title="Nhật Kim Anh" placement="top">
            <Avatar alt="Nhật Kim Anh" src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.99422-6/725786867_27429911306620245_5957848464790857549_n.png?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=rhp60l7fKXcQ7kNvwG7zxZf&_nc_oc=AdqQv3FD5rnJ4dudovn1_8IHidt1bM3eI175EYyYrNTIn4a2xlZ8q1fijqxeaKbWSbQ&_nc_zt=14&_nc_ht=scontent.fhan18-1.fna&_nc_gid=_4oovVpiU6-xe9V8Xz46XQ&_nc_ss=7b2a8&oh=00_AQC2IClVJitppemMxzygRIHcJ2f1VYDmZ8beoTYE6-7SNw&oe=6A688D22" />
          </Tooltip>
          <Tooltip title="Nghia Ngao" placement="top">
            <Avatar alt="Nghia Ngao" src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/673022166_1913278385986249_8351059440825815585_n.jpg?stp=dst-jpg_tt6&cstp=mx1532x1526&ctp=s200x200&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Gh753Pz7awsQ7kNvwGmCc41&_nc_oc=AdpOU24XvJtYfFwlAwAYUYXYB3AgtJuEYV8QTOMyg3L3fnrAbRPb6k9_KWzv7SMTATU&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=F2Gd1ykVaJU34UtLpmp5AA&_nc_ss=7b2a8&oh=00_AQBBw71oVg_Af1NFVvbU1yE2_tzQYU2KJN0FGcGC_2-X_g&oe=6A688701" />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box >
  )
}

export default BoardBar