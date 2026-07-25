
import { mapOrder } from '~/utils/sort'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Cards/Cards'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  // Press delay of 250ms, with tolerance of 5px of movement
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    },
  })
  // Require the mouse to move by 10 pixels before activating
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const mySensors = useSensors(touchSensor, mouseSensor)
  const [orderedColumns, setOrderedColumnState] = useState([])

  // 1 thoi diem chi co 1 phan tu dc keo
  const [activeDragItemId, setactiveDragItemId] = useState([])
  const [activeDragItemTye, setactiveDragItemType] = useState([])
  const [activeDragItemData, setactiveDragItemData] = useState([])

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragStart = (event) => {
    console.log(event.active.data.current)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
  }
  const handleDragEnd = (event) => {

    const { active, over } = event
    if (!over) return // khong ton tai diem den

    if (active.id !== over.id) {

      const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
      const newIndex = orderedColumns.findIndex(c => c._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      setOrderedColumnState(dndOrderedColumns)
    }
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)

  }
  const customdropAnimations = {
    sideEffects: defaultDropAnimationSideEffects({ style: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors} onDragStart={handleDragStart}>
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