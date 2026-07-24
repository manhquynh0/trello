
import Box from '@mui/material/Box'

import Cards from './Cards/Cards'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '60px'
function ListCards() {

  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
    }}>
      <Cards />
      <Cards temporaryHideMedia />
      <Cards />
    </Box>
  )

}

export default ListCards