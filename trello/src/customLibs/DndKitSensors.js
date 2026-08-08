import { MouseSensor, TouchSensor } from '@dnd-kit/core'

// Hàm kiểm tra: đi ngược từ element được click lên tới gốc,
// nếu gặp bất kỳ phần tử nào có data-no-dnd="true" thì KHÔNG cho kích hoạt kéo
const shouldHandleEvent = (element) => {
  let cur = element
  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }
  return true
}

export class MouseSensorCustom extends MouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown',
      handler: ({ nativeEvent: event }) => shouldHandleEvent(event.target)
    }
  ]
}

export class TouchSensorCustom extends TouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart',
      handler: ({ nativeEvent: event }) => shouldHandleEvent(event.target)
    }
  ]
}