import Swal, {
    type SweetAlertResult
} from "sweetalert2";

const Delete = (title: string, callback: () => void): void => {
    Swal.fire({
        icon: 'question',
        iconColor: '#f4d03f',
        title: title,
        showCancelButton: true,
        reverseButtons: true,
        width: 'fit-content',
        customClass: {
            popup: 'items-center rounded-lg shadow-lg p-0.5',
            title: ' font-thin text-gray-600 text-[1rem]',
            confirmButton: 'w-[250px] rounded py-1.5 text-blue-400 bg-blue-100 font-medium hover:bg-blue-400 hover:text-white transition-all',
            cancelButton: 'w-[250px] py-1.5 rounded bg-red-100 text-red-400 font-medium hover:bg-red-500 hover:text-white transition-all',
        }
    }).then((result: SweetAlertResult): void => {
        if(result.isConfirmed) {
            callback && callback();
        }
    });
}
export default Delete;