import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const LoadingPage = (caption) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3
        }}
      >
        <CircularProgress size={50} thickness={4} />
        <Typography>{caption}</Typography>
      </Box>

      <Skeleton
        variant="rounded"
        sx={{
          width: 350,
          height: 50,
          borderRadius: 3
        }}
      />

      <Skeleton
        variant="rounded"
        sx={{
          mt: 2,
          width: '100%',
          height: 80,
          borderRadius: 3
        }}
      />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 3
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            variant="rounded"
            sx={{
              width: 320,
              height: 600,
              borderRadius: 4
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LoadingPage