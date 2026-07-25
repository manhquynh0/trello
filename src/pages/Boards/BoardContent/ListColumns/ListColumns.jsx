
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import QueueIcon from '@mui/icons-material/Queue'
function ListColumns({ columns }) {

  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      gap: 2,
      '&::-webkit-scrollbar-track': {
        m: 2
      }
    }}>
      {columns?.map(column =>  <Column key={column._id} column = {column} />  )}

      <Box sx={{
        maxWidth: '200px',
        bgcolor: 'background.paper',
        height: 'fit-content',
        borderRadius: '8px',
        p: '5px'
      }}>
        <Button startIcon={<QueueIcon />}>Add New Column</Button>
      </Box>
    </Box>
  )
}

export default ListColumns