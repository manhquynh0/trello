

import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
function BoardConetent() {

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      height: (theme) => theme.boardContentHeight,
      // backgroundColor: 'rgba(144, 202, 249, 0.16)',
      p: '10px 0'
    }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardConetent