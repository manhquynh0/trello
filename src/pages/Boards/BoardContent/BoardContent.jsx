
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
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Cards/Cards'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/PlaceHolderCard'
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
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    const orderedColumnsData = mapOrder(board?.columns, board?.columnOrderIds, '_id')

    orderedColumnsData.forEach(column => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      }
    })

    setOrderedColumnState(orderedColumnsData)
  }, [board])
  // Find column by cardid
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id).includes(cardId))
  }
  //Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = () => {

  }
  const handleDragStart = (event) => {
    // console.log(event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))

    }
  }
  const handleDragOver = (event) => {
    // No action when drag the cloumn
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
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
        // Tính vị trí chính xác chèn card
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1
        //Clone mang OrderedColumns cũ ra mộtc cái mới để xử lý data rồi return _ cập nhât lại orderedColumnsState mới
        const nextColumns = cloneDeep(preColumns) // Columns ban đầu
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id) // tìm column được kéo khỏi column
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id) // tìm column được kéo đến
        if (nextActiveColumn) {
          // Xóa card ở column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          if (isEmpty(nextActiveColumn.cards)) {
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          }
          // Cập nhật lại mảng cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo có tồn tại over column chưa, chưa thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Đối với DragEnd thì phải cập nhật lại chuẩn dữ liệu columnID trong card sau khi kéo card giữa 2 column khác nhau
          //Phải cập nhật lại chuẩn dữ liệu columnID card sau khi kéo card giữa 2 column khác nhau
          const rebuild_activeDraggingCardData = {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }
          // Thêm card đang có vào overcloumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
          //Xóa card trống
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
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
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

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
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
          //Clone mang OrderedColumns cũ ra một cái mới để xử lý data rồi return _ cập nhât lại orderedColumnsState mới
          const nextColumns = cloneDeep(preColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
          if (nextActiveColumn) {
            // Xóa card ở column cũ
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
            if (isEmpty(nextActiveColumn.cards)) {
              nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
            }
            // Cập nhật lại mảng cardOrderIds
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }
          if (nextOverColumn) {
            // Kiểm tra xem card đang kéo có tồn tại over column chưa, chưa thì cần xóa nó trước
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            // Đối với DragEnd thì phải cập nhật lại chuẩn dữ liệu columnID trong card sau khi kéo card giữa 2 column khác nhau
            //Phải cập nhật lại chuẩn dữ liệu columnID card sau khi kéo card giữa 2 column khác nhau
            const rebuild_activeDraggingCardData = {
              ...activeDraggingCardData,
              columnId: nextOverColumn._id
            }
            // Thêm card đang có vào overcloumn
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
            nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
            // Cập nhật lại mảng cardOrderIds
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

          }
          return nextColumns
        }

        )
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
    }
    // Xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
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
  // ...trong component
  const lastOverId = useRef(null)

  const collisionDetectionStrategy = useCallback((args) => {
    // Nếu đang kéo Column, dùng closestCorners cho đơn giản
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Ưu tiên tìm va chạm bằng con trỏ chuột (chính xác nhất)
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return []

    // Lấy va chạm đầu tiên
    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
      // Nếu overId là 1 column (không phải card) -> tìm card gần nhất bên trong column đó
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return container.id !== overId &&
              checkColumn?.cardOrderIds?.includes(container.id)
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])
  const customdropAnimations = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext
      sensors={mySensors}
      collisionDetection={collisionDetectionStrategy}
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
          {(!activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent