
import { mapOrder } from '~/utils/sort'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor, useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Cards/Cards'
import { cloneDeep } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  // Press delay of 250ms, with tolerance of 5px of movement
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  // Require the mouse to move by 10 pixels before activating
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const mySensors = useSensors(touchSensor, mouseSensor, pointerSensor)
  const [orderedColumns, setOrderedColumnState] = useState([])

  // 1 thoi diem chi co 1 phan tu dc keo
  const [activeDragItemId, setactiveDragItemId] = useState(null)
  const [activeDragItemTye, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  // Find column by cardid
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id).includes(cardId))
  }
  const handleDragStart = (event) => {
    // console.log(event.active.data.current)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))

    }
  }
  const handleDragOver = (event) => {
    // No action when drag the cloumn
    if (activeDragItemTye === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // if drag column
    // console.log('handleDragOver', event)
    const { active, over } = event
    // không tồn tại activce or over thì không làm gì ( khi kéo ra khỏi container để tránh crash trang)
    if (!active || !over) return

    // activeDraggingCardId : Là Card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // OverCard : Là Card đang được tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId } = over

    // Tìm 2 cái columns theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log(activeColumn)
    // console.log(overColumn)
    // Neu khong ton tai thi khong lam gi hett
    if (!activeColumn || !overColumn) return
    // Xử lý ở đây là chỉ khi kéo qua 2 column khác nhau, còn không thì khong làm gì
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnState(preColumns => {
        // Tìm vị trí của overcard trong column đích
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        // console.log('overCardIndex', overCardIndex)
        // Logic tinh newCardIndex
        let newCardIndex
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.length + 1
        //Clone mang OrderedColumns cũ ra mộtc cái mới để xử lý data rồi return _ cập nhât lại orderedColumnsState mới
        const nextColumns = cloneDeep(preColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        if (nextActiveColumn) {
          // Xóa card ở column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Cập nhật lại mảng cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo có tồn tại over column chưa, chưa thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Thêm card đang có vào overcloumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // Cập nhật lại mảng cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

        }
        return nextColumns
      }

      )
    }

  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    // không tồn tại activce or over thì không làm gì ( khi kéo ra khỏi container để tránh crash trang)
    if (!active || !over) return
    // Xu ly keo tha card
    if (activeDragItemTye === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      // activeDraggingCardId : Là Card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // OverCard : Là Card đang được tương tác trên hoặc dưới so với card được kéo ở trên
      const { id: overCardId } = over

      // Tìm 2 cái columns theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // console.log(activeColumn)
      // console.log(overColumn)
      // Neu khong ton tai thi khong lam gi hett
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        console.log('Hanh dong keo tha card giua 2 column khac nhau')
      }
      else {
        const oldIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldIndex, newIndex)
        setOrderedColumnState(preColumns => {
          const nextColumns = cloneDeep(preColumns)
          // Tim toi column ma chung ta dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          //cap nhat 2 gia tri moi la card va cardorederIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
      // Xu ly keo tha column
      if (activeDragItemTye === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        if (active.id !== over.id) {

          const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
          const newIndex = orderedColumns.findIndex(c => c._id === over.id)

          const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
          setOrderedColumnState(dndOrderedColumns)
        }
      }


      setactiveDragItemId(null)
      setactiveDragItemType(null)
      setactiveDragItemData(null)
      setOldColumnWhenDraggingCard(null)

    }
  }

  const customdropAnimations = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext
      sensors={mySensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        height: (theme) => theme.boardContentHeight,
        // backgroundColor: 'rgba(144, 202, 249, 0.16)',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customdropAnimations}>
          {(!activeDragItemTye) && null}
          {(activeDragItemId && activeDragItemTye === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemTye === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent