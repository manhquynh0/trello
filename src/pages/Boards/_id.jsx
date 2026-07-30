

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetaislApi } from '~/apis'
import React from 'react'
function Board() {
  const [board, setBoard] = React.useState(null)
  React.useEffect(() => {
    const boardId = '6a6b3a3ea4af4c557f70c9d6'
    fetchBoardDetaislApi(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container >
  )
}

export default Board