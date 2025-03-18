import Swal from "sweetalert2";

const ConfirmToast = async ({
  title,
  message,
  type,
  confirmText,
  cancelText,
}: {
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "none";
  confirmText: string;
  cancelText: string;
}): Promise<boolean> => {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: type,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    customClass: {
      confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
      cancelButton: "bg-gray-300 text-black px-4 py-2 rounded",
    },
  });

  return result.isConfirmed;
};

export default ConfirmToast;
