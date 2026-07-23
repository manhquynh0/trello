
import {
  useColorScheme
} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded'

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

export default ThemeSwitcher