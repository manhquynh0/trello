
import Box from '@mui/material/Box'
import ThemeSwitcher from '../../components/ModeSelect'
function AppBar() {

  return (
    <Box sx={{
      with: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <ThemeSwitcher />
    </Box>
  )

}

export default AppBar