

import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar'
import BoardContent from './BoardContent/BoardContent'
import { updateBoardDetaislApi, updateColumnDetaislApi, moveCardtoDifferentColumnApi } from '~/apis'
import React from 'react'
import { cloneDeep } from 'lodash'
import LoadingPage from '~/pages/Loading/LoadingPage'
import { toast } from 'react-toastify'
import { socketIoInstance } from '~/socketClient'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
  updateCardInCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = React.useState(null)
  const card = useSelector(selectCurrentActiveCard)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()
  React.useEffect(() => {
    // const boardId = '6a6db6b04a357c43f9e82a9f'
    // Call API
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  React.useEffect(() => {
    // Lắng nghe sự kiện Realtime Socket khi có người join / leave card
    const onReceiveUserJoinedCard = (data) => {
      if (data?.updatedCard) {
        dispatch(updateCardInCurrentActiveBoard(data.updatedCard))
        if (card?._id === data.cardId) {
          dispatch(updateCurrentActiveCard(data.updatedCard))
        }
      }

      if (data.action === 'ADD') {
        toast.info(`${data.user?.displayName || 'Someone'} joined a card!`)
      } else if (data.action === 'REMOVE') {
        toast.info(`${data.user?.displayName || 'Someone'} left a card!`)
      }
    }

    socketIoInstance.on('BE_USER_JOINED_CARD', onReceiveUserJoinedCard)

    return () => {
      socketIoInstance.off('BE_USER_JOINED_CARD', onReceiveUserJoinedCard)
    }
  }, [dispatch, card?._id])

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
  // Trường hợp Imuability ở đây là đụng tới giá trị card đang được coi là readOnly (nested Object)
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
    await updateColumnDetaislApi(columnId, { cardOrderIds: dndOrderedCardsIds })
  }
  const moveCardBetweenDifferentColumns = async (prevColumnId, nextColumnId, currentCardId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    await moveCardtoDifferentColumnApi({
      boardId: board._id,
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds.filter(id => !id.includes('-placeholder-card')),
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds.filter(id => !id.includes('-placeholder-card'))
    })
  }
  // const deleteColumn = async (columnId) => {
  // }

  if (!board) {
    return <LoadingPage caption='Chờ một xíu nhé ~' />
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'background.default' }}>
      {card && < ActiveCard />}
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