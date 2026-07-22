import {
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0F172A'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9'
        }
      }
    }
  }
  // ...other properties
})
export default theme