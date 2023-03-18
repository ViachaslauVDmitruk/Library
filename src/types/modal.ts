import { Dispatch, SetStateAction } from 'react';

export type ModalFromState = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookId?: string | number;
};
