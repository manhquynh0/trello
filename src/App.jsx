
import './App.css'
import Typography from '@mui/material/Typography'
import {
  useColorScheme
} from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded'
import Container from '@mui/material/Container'


function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme()
  const handleToggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }
  return (
    <IconButton onClick={handleToggleTheme} color="inherit">
      {mode === 'dark' ? <LightModeIcon /> : <NightsStayRoundedIcon />}
    </IconButton>
  )
}


function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor : 'primary.main' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>ManhQuynhDev - 1 lap trinh vien </Typography>
      <ThemeSwitcher />
    </Container >
  )
}

export default App
