

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetaislApi } from '~/apis'
import { mockData } from '~/apis/mock-data'
import React from 'react'
function Board() {
  const [board, setBoard] = React.useState(null)
  React.useEffect(() => {
    const boardId = '6a6c04f6e911719f907dfb4b'
    fetchBoardDetaislApi(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container >
  )
}

export default Board