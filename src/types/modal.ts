import { Dispatch, SetStateAction } from 'react';

import { BookingProps } from '../store/books/types';

export type ModalFromState = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  bookId?: string | number;
  booking?: BookingProps;
};
