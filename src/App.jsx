
import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
function App() {
  return (
    <>
      <div>manhquynhdev</div>
      <Typography variant ="body2" sx={{ color: 'text.secondary' }}>ManhQuynhDev - 1 lap trinh vien </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}

export default App
