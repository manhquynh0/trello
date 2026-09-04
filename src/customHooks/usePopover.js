import { useState } from 'react'

export const usePopover = () => {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  return {
    anchorPopoverElement,
    isOpenPopover,
    handleTogglePopover,
    setAnchorPopoverElement
  }
}
