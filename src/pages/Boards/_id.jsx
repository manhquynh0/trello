

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetaislApi, createdNewColumnAPI, createdNewCardAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'
import React from 'react'
function Board() {
  const [board, setBoard] = React.useState(null)
  React.useEffect(() => {
    const boardId = '6a6b4b2b0f2c4864dccaa4c0'
    fetchBoardDetaislApi(boardId).then(board => {
      setBoard(board)

    })
  }, [])
  const createdNewColumn = async (newColumn) => {
    const createdColumn = await createdNewColumnAPI({
      ...newColumn,
      boardId: board?._id
    })
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createdNewCard = async (newCard) => {
    const createdCard = await createdNewCardAPI({
      ...newCard,
      boardId: board?._id
    })
    const newBoard = { ...board }
    const column = newBoard.columns.find(c => c._id === createdCard.columnId)
    column.cards.push(createdCard)
    column.cardOrderIds.push(createdCard._id)
    setBoard(newBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createdNewColumn={createdNewColumn} createdNewCard={createdNewCard} />
    </Container >
  )
}

export default Board