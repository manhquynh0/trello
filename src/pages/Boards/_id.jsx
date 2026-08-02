

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetaislApi, createdNewColumnAPI, createdNewCardAPI, updateBoardDetaislApi, updateCardDetaislApi, moveCardtoDifferentColumnApi, deleteColumnApi } from '~/apis'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sort'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/PlaceHolderCard'
import Typography from '@mui/material/Typography'
function Board() {
  const [board, setBoard] = React.useState(null)
  React.useEffect(() => {
    const boardId = '6a6db6b04a357c43f9e82a9f'
    fetchBoardDetaislApi(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {

          const placeholderCard = generatePlaceholderCard(column)
          column.cards = [placeholderCard]
          column.cardOrderIds = [placeholderCard._id]

        }
        else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
  const createdNewColumn = async (newColumn) => {
    const createdColumn = await createdNewColumnAPI({
      ...newColumn,
      boardId: board._id
    })

    if (isEmpty(createdColumn.cards)) {
      const placeholderCard = generatePlaceholderCard(createdColumn)

      createdColumn.cards = [placeholderCard]
      createdColumn.cardOrderIds = [placeholderCard._id]
    }

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
    if (
      column.cards.length === 1 &&
      column.cards[0].FE_PlaceholderCard
    ) {
      column.cards = []
      column.cardOrderIds = []
    }
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
    await updateBoardDetaislApi(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })

  }
  const moveCards = async (columnId, dndOrderedCards) => {
    const dndOrderedCardsIds = dndOrderedCards.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.map(column => {
      if (column._id !== columnId) return column
      return {
        ...column,
        cards: dndOrderedCards,
        cardOrderIds: dndOrderedCardsIds
      }
    })
    setBoard(newBoard)
    await updateCardDetaislApi(columnId, { cardOrderIds: dndOrderedCardsIds })
  }
  const moveCardBetweenDifferentColumns = async (prevColumnId, nextColumnId, currentCardId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await moveCardtoDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns
        .find(c => c._id === prevColumnId)
        ?.cardOrderIds.filter(id => !id.includes('-placeholder-card')),
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns
        .find(c => c._id === nextColumnId)
        ?.cardOrderIds.filter(id => !id.includes('-placeholder-card'))
    })
  }
  const deleteColumn = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column =>
      column._id !== columnId
    )
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id =>
      id !== columnId
    )
    setBoard(newBoard)
    await deleteColumnApi(columnId)
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: '20px' }}>Chờ một xíu nhé ~</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board}
        createdNewColumn={createdNewColumn}
        createdNewCard={createdNewCard}
        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardBetweenDifferentColumns={moveCardBetweenDifferentColumns}
        deleteColumn={deleteColumn}
      />
    </Container >
  )
}

export default Board