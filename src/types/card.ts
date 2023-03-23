import { BookingProps, DeliveryProps } from '../store/books/types';
import { BookingUserType, CommentsType } from '../store/login/type';

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
  bookingUserBookId?: string | number | null;
  deliveryUser?: string | null;
  commentsUser?: CommentsType[];
};
