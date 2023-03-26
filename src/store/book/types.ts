import { BookingProps, DeliveryProps, HistoriesProps } from '../books/types';

export type BookStateProps = {
  isLoadingBook: boolean;
  book: OneBookProps;
  isErrorOneBook: boolean;
};

export type OneBookProps = {
  id: number | string;
  title: string;
  rating: number | null;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: ImageProps[];
  categories: string[];
  comments: CommentsProps[];
  booking: BookingProps;
  delivery: DeliveryProps;
  histories: HistoriesProps[];
};

export type ImageProps = {
  url: string | null;
};

export type CommentsProps = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: UserProps;
};

export type UserProps = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};
