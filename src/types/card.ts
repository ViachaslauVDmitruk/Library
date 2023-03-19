import { BookingProps, DeliveryProps } from '../store/book/types';

export type CardProps = {
  src: CardImages | null;
  rating: number | null;
  title: string;
  authors: string[];
  id: number;
  issueYear: string;
  searchValue: string;
  booking: BookingProps;
  delivery: DeliveryProps;
};
export type CardImages = {
  url: string | null;
};
