import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { Link } from 'react-router-dom'

import page404 from '~/assets/test404.gif'

export default function NotFound() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Box
        component="img"
        src={page404}
        alt="404"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeRoundedIcon />}
        sx={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          px: 4,
          py: 1.5,
          borderRadius: '999px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 4,
          '&:hover': {
            transform: 'translateX(-50%) scale(1.05)'
          }
        }}
      >
        Back to Home
      </Button>
    </Box>
  )
}