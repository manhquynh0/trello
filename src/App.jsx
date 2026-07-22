
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

import GlobalStyles from '@mui/material/GlobalStyles'

const inputGlobalStyles = <GlobalStyles styles={{ h1: { color: 'pink' } }} />
import styled from '@mui/material/styles'

// styled : tai su dung copomnent
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: 0,
  borderRadius: 8,
  color: 'white',
  padding: '10px 30px',
  '&:hover': {
    opacity: 0.9
  }
}))
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
      {inputGlobalStyles}
      {/* su dung cho component cu the */}
      <Button
        sx={{
          backgroundColor: 'primary.main', // tham chiếu tới theme
          color: 'white',
          borderRadius: 2, // MUI tự nhân với theme.spacing (2 * 8px = 16px)
          px: 3, // padding-x
          '&:hover': {
            backgroundColor: 'primary.dark'
          },
          // responsive
          fontSize: { xs: 14, sm: 16, md: 18 }
        }}
      >
        Nhấn vào đây
      </Button>
      { GradientButton }
      <h1>Grey h1 element</h1>
      <ThreeDRotation />
    </>
  )
}

export default App
