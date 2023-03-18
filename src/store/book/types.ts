export type BookStateProps = {
  isLoading: boolean;
  book: OneBookProps;
  isError: boolean;
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
  booking: BookingProps | null;
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

export type BookingProps = {
  id: number | string;
  order: boolean;
  dateOrder: string;
  customerId: number | string;
  customerFirstName: string;
  customerLastName: string;
};

export type DeliveryProps = {
  id: number | string;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number | string;
  recipientFirstName: string;
  recipientLastName: string;
};

export type HistoriesProps = {
  id: number;
  userId: number;
};
