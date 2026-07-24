import {
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
// Create a theme instance.
const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '65px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
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
          default: '#0F172A', // nền chính
          paper: '#1A2540' // card, sidebar, menu
        },

        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          disabled: '#64748B'
        },

        primary: {
          main: '#3B82F6', // xanh dương nổi bật
          light: '#60A5FA',
          dark: '#2563EB',
          contrastText: '#FFFFFF'
        },

        secondary: {
          main: '#EC4899', // hồng
          contrastText: '#FFFFFF'
        },

        divider: 'rgba(255,255,255,0.08)',

        action: {
          hover: 'rgba(59,130,246,0.12)',
          selected: 'rgba(59,130,246,0.20)',
          disabled: 'rgba(148,163,184,0.30)',
          disabledBackground: 'rgba(148,163,184,0.12)'
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
            // color: theme.palette.text.secondary,
            // backgroundColor: 'rgba(255,255,255,.08)'
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body2': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({
          theme
        }) => ({
          color: theme.palette.text.primary,
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
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '12px'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '10px',
            height: '10px'
          },
          /* Track */
          '*::-webkit-scrollbar-track': {
            background: '#1E293B'
          },
          /* Handle */
          '*::-webkit-scrollbar-thumb': {
            background: '#0F172A',
            borderRadius: '8px'
          },
          /* Handle on hover */
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }
      }
    }
  }

  // ...other properties
})
export default theme