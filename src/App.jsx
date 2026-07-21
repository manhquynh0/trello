
import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
import {
  useColorScheme
} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

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

// function ModeButtonToggle() {
//   const { mode, setMode } = useColorScheme()
//   const handleFormat = (event) => {
//     setMode(event.target.value)
//   }

//   return (
//     <ToggleButtonGroup
//       onChange={handleFormat}
//       aria-label="text formatting"
//       value="mode"
//     >
//       <ToggleButton value="light" aria-label="bold">Light
//       </ToggleButton>
//       <ToggleButton value="dark" aria-label="italic">Dark
//       </ToggleButton>
//       <ToggleButton value="system" aria-label="underlined">System
//       </ToggleButton>
//     </ToggleButtonGroup>
//   )
// }
// function ModeToggle() {
//   const { mode, setMode } = useColorScheme()
//   // const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
//   // const preferLightMode = useMediaQuery('(prefers-color-scheme: light)')

//   // return (
//   //   <Button
//   //     onClick={() => {
//   //       setMode(mode === 'light' ? 'dark' : 'light')
//   //     }}
//   //   >
//   //     {mode === 'light' ? 'Turn dark' : 'Turn light'}
//   //   </Button>
//   // )
// }


function App() {
  return (
    <>
      <div>manhquynhdev</div>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>ManhQuynhDev - 1 lap trinh vien </Typography>
      {/* <ModeToggle /> */}
      {/* <ModeButtonToggle /> */}
      <ThemeSwitcher />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}

export default App
