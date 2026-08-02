import Swal from 'sweetalert2'
export const confirmDelete = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    width: '400px',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    customClass: {
      popup: 'my-popup'
    }
  })
}