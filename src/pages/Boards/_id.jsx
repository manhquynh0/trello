

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { createdNewCardAPI, updateBoardDetaislApi, updateCardDetaislApi, moveCardtoDifferentColumnApi, deleteColumnApi } from '~/apis'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'

import Typography from '@mui/material/Typography'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = React.useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  React.useEffect(() => {
    const boardId = '6a6db6b04a357c43f9e82a9f'
    // Call API
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  const createdNewColumn = async (newColumn) => {
  }
  const createdNewCard = async (newCard) => {
  }
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))
    await updateBoardDetaislApi(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })

  }
  // Trường hợp Imuuability ở đây là đụng tới giá trị card đang được coi là readOnly (nested Object)
  const moveCards = async (columnId, dndOrderedCards) => {
    const dndOrderedCardsIds = dndOrderedCards.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = newBoard.columns.map(column => {
      if (column._id !== columnId) return column
      return {
        ...column,
        cards: dndOrderedCards,
        cardOrderIds: dndOrderedCardsIds
      }
    })
    dispatch(updateCurrentActiveBoard(newBoard))
    await updateCardDetaislApi(columnId, { cardOrderIds: dndOrderedCardsIds })
  }
  const moveCardBetweenDifferentColumns = async (prevColumnId, nextColumnId, currentCardId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

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
        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardBetweenDifferentColumns={moveCardBetweenDifferentColumns}
        deleteColumn={deleteColumn}
      />
    </Container >
  )
}

export default Board