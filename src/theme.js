import {
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#90caf9' // đổi từ dark sang light
        }
      }
    },
    dark: {
      palette: {
        background: {
          default: '#0F172A',
          paper: '#1E293B'
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          disabled: '#475569'
        },
        primary: {
          main: '#0F172A',
          light: '#BBDEFB',
          dark: '#42A5F5',
          contrastText: '#0F172A'
        },
        secondary: {
          main: '#F472B6',
          contrastText: '#0F172A'
        },
        divider: 'rgba(248, 250, 252, 0.12)',
        action: {
          hover: 'rgba(144, 202, 249, 0.08)',
          selected: 'rgba(144, 202, 249, 0.16)',
          disabled: 'rgba(148, 163, 184, 0.3)',
          disabledBackground: 'rgba(148, 163, 184, 0.12)'
        }
      }
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: ({
          theme
        }) => ({
          color: theme.palette.text.primary,
          fontSize: '1rem',
          '&:hover': {
            color: theme.palette.text.secondary,
            backgroundColor: 'rgba(255,255,255,.08)'
          }
        })
      }
    },
    MuiInput: {
      styleOverrides: {
        // Name of the slot
        root: ({
          theme
        }) => ({
          color: theme.palette.text.primary,
          fontSize: '1rem',
          '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: 'rgba(255,255,255,.08)'
          }
        })
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#F59E0B',
          color: '#fff'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({
          theme
        }) => ({
          color: theme.palette.text.secondary,
          fontSize: '1.6rem',

          '&:hover': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({
          theme
        }) => ({
          color: theme.palette.text.secondary,

          '& .MuiListItemIcon-root': {
            color: theme.palette.text.secondary,
            minWidth: 36
          },

          '&:hover .MuiListItemIcon-root': {
            color: theme.palette.text.primary
          }
        })
      }
    }
  }
  // ...other properties
})
export default theme