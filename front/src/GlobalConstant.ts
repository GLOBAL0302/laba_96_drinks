import { Bounce } from 'react-toastify';

export const apiUrl = 'http://localhost:8000';

export const toastifySuccess: any = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};
