
import Box from '@mui/material/Box'
import ThemeSwitcher from '~/components/ModeSelect'
import trello from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menu/WorkSpace'
import Rencent from './Menu/Recent'
import Template from './Menu/Template'
import Starred from './Menu/Starred'
import Profiles from './Menu/Profiles'
import { Link } from 'react-router-dom'
import Notifications from '~/components/AppBar/Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

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

      <Link to='/' style={{ textDecoration: 'none ' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 4,
          gap: 0.5,
          color: 'text.primary'
        }}>
          <SvgIcon component={trello} sx={{ color: 'text.primary' }} inheritViewBox />
          <Typography variant='span' sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }}>QLLO</Typography>
        </Box>
      </Link>
      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        xs: 'none'
      }}>
        {/* <WorkSpace />
        <Rencent />
        <Starred />
        <Template /> */}
      </Box>


      <Box sx={{
        mx: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5
      }}>
        {/* <Search sx={{ width: { xs: '120px', sm: 'auto' }, ml: 2 }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}
        <AutoCompleteSearchBoard />
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
            <Notifications />
            <Profiles />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AppBar