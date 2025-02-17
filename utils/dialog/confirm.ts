import Swal, {
    type SweetAlertResult
} from "sweetalert2";

const Confirm = (title: string, callback: () => void): void => {
  Swal.fire({
      icon: 'question',
      title: title,
      showCancelButton: true,
      reverseButtons: true,
      width: '21rem',
      position: 'top-end',
      cancelButtonColor: '#f62e2e',
      confirmButtonColor: '#0cb8fd',
      customClass: {
          popup: 'flex flex-col gap-3 items-center rounded-lg shadow-lg bg-white p-4',
          title: 'text-xl font-bold text-gray-700',
          confirmButton: 'px-4 py-2 rounded bg-blue-500 text-white',
          cancelButton: 'px-4 py-2 rounded bg-red-500 text-white',
      }
  })
  .then((result: SweetAlertResult): void => {
      if(result.isConfirmed) {
          callback && callback();
      }
  });
}


export default Confirm;