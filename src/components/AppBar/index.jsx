
import Box from '@mui/material/Box'
import ThemeSwitcher from '~/components/ModeSelect'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { ReactComponent as trello } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menu/WorkSpace'
import Rencent from './Menu/Recent'
import Template from './Menu/Template'
import Starred from './Menu/Starred'
import Button from '@mui/material/Button'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menu/Profiles'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(4), // ← thêm dòng này, chừa chỗ cho nút X
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))
function AppBar() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'background.paper',
      padding: '10px',
      overflowX: 'auto'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }} >
        <AppsOutlinedIcon sx={{ color: 'text.primary' }} />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          color: 'text.primary'
        }}>
          <SvgIcon component={trello} sx={{ color: 'text.primary' }} inheritViewBox />
          <Typography variant='span' sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }}>QLLO</Typography>
        </Box>
        <Box sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          xs: 'none'
        }}>
          <WorkSpace />
          <Rencent />
          <Starred />
          <Template />
          <Button variant="contained" color="success" sx={{
            backgroundColor: '#16A34A', // màu mặc định khi chưa hover
            '&:hover': {
              backgroundColor: '#22C55E'// sáng hơn khi hover
            }
          }}>
            Create
          </Button>
        </Box>

      </Box>
      <Box sx={{
        mx: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5
      }}>
        <Search sx={{ width: { xs: '120px', sm: 'auto' }, ml: 2 }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{
          mx: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.5
        }}>
          <ThemeSwitcher />

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5
          }}>
            <Tooltip title="Noti" placement="top">
              <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>

                <NotificationsNoneIcon />
              </Badge>
            </Tooltip>
            <Tooltip title="Noti" placement="top">
              <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>
                <HelpOutlineIcon />
              </Badge>
            </Tooltip>
            <Profiles />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AppBar