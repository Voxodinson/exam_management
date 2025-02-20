import Swal from "sweetalert2";

const Error = (title: string): void => {
    Swal.fire({
        position: 'bottom-right',
        title: title,
        toast: true,
        showCancelButton: false,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 4000,
        width: '500px',
        customClass: {
            title: ' font-normal text-red-600 text-[1rem]',
        }
    });
}

export default Error;