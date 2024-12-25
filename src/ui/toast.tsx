import { TbAlertCircle } from "react-icons/tb"
import { RiCheckboxCircleFill } from "react-icons/ri"
import  toast, { ToastPosition } from 'react-hot-toast';
import { IconType } from "react-icons";


export const options = {
  duration: 6000,
  position: "top-right" as ToastPosition,
  id: 'toaster',
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    padding: "0.75rem 2rem 0.75rem 1rem",
  },
  // button: true,
  // heading: '',
  // bar: { size: '1px' }
}

// var currentToast = null;

export default function toaster(message: string, type: string) {
  // if (currentToast) {
  //   currentToast.dismiss({
  //     onClose: () => {
  //       // Once the animation is complete, set currentToast to null
  //       currentToast = null;
  //     }
  //   });
  // }
  switch (type) {
    case "success":
      toast.success(message, { ...options, });
      break;
    case "error":
      toast.error(message, { ...options, });
      break;

    default:
      toast(message, { ...options, });
      break;


  }
}