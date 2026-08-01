

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetaislApi, createdNewColumnAPI, createdNewCardAPI, updateBoardDetaislApi } from '~/apis'
import { mockData } from '~/apis/mock-data'
import React from 'react'
function Board() {
  const [board, setBoard] = React.useState(null)
  React.useEffect(() => {
    const boardId = '6a6db6b04a357c43f9e82a9f'
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
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    await updateBoardDetaislApi(newBoard._id, { columnOrderIds : dndOrderedColumnsIds })

  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createdNewColumn={createdNewColumn} createdNewCard={createdNewCard} moveColumns={moveColumns} />
    </Container >
  )
}

export default Board