import Swal from 'sweetalert2'
export const confirm = (title, confirmButtonText) => {
  return Swal.fire({
    title,
    icon: 'warning',
    showCancelButton: true,
    width: '400px',
    confirmButtonText,
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#d33',
    customClass: {
      popup: 'my-popup',
      container: 'my-swal-container'
    }
  })
}