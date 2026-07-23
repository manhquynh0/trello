
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
      with: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }} >
        <AppsOutlinedIcon sx={{}} />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          color: 'text.primary'
        }}>
          <SvgIcon component={trello} inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }}>QLLO</Typography>
        </Box>
        <WorkSpace />
        <Rencent />
        <Starred />
        <Template />
        <Button variant="contained" color="success">
          Create
        </Button>
      </Box>
      <Box>ManhQuynhDev</Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        color: 'text.primary'
      }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <ThemeSwitcher />

        <Tooltip title="Noti" placement="top">
          <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>

            <NotificationsNoneIcon color="action" />
          </Badge>
        </Tooltip>
        <Tooltip title="Noti" placement="top">
          <Badge badgeContent={4} color="primary" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon color="action" />
          </Badge>
        </Tooltip>
        <Profiles />

      </Box>
    </Box>
  )
}

export default AppBar