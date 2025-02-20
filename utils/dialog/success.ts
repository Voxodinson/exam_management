import Swal from "sweetalert2";

const Success = (title: string): void => {
    Swal.fire({
        toast: true,
        position: 'bottom-right',
        title: title,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 4000,
        width: '500px',
        customClass: {
            title: 'font-normal text-green-600 text-[1rem]',
        }
    });
}

export default Success;