export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
export const interceptorLoadingElements = (calling) => {
  // DOM lấy ra toàn bộ phần tử trên trang có class "interceptor-loading"
  const elements = document.querySelectorAll('.interceptor-loading')

  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Đang gọi API
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      // Gọi API xong
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}