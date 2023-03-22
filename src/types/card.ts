import { BookingProps, DeliveryProps } from '../store/books/types';
import { BookingUserType } from '../store/login/type';

export type CardProps = {
  src: string | null;
  rating: number | null;
  title: string;
  authors: string[] | [];
  id: number | string;
  issueYear: string;
  searchValue?: string;
  booking?: BookingProps;
  delivery?: DeliveryProps;
  bookingUser?: BookingUserType;
};
