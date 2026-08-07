

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { updateBoardDetaislApi, updateCardDetaislApi, moveCardtoDifferentColumnApi } from '~/apis'
import React from 'react'
import { cloneDeep } from 'lodash'
import LoadingPage from '~/pages/Loading/LoadingPage'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = React.useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()
  React.useEffect(() => {
    // const boardId = '6a6db6b04a357c43f9e82a9f'
    // Call API
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  // const createdNewColumn = async (newColumn) => {
  // }
  // const createdNewCard = async (newCard) => {
  // }
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
  // const deleteColumn = async (columnId) => {
  // }

  if (!board) {
    <LoadingPage caption = 'Chờ một xíu nhé ~' />
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board}
        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardBetweenDifferentColumns={moveCardBetweenDifferentColumns}
      />
    </Container >
  )
}

export default Board