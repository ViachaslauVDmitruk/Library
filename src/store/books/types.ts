export type BooksState = {
  isLoadingBooks: boolean;
  books: BookProps[];
  isErrorBooks: boolean;
};

export type BookProps = {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: string[];
  image: ImageProps | null;
  categories: string[];
  id: number;
  booking: BookingProps;
  delivery: DeliveryProps;
  histories: HistoriesProps;
};

export type ImageProps = {
  url: string | null;
};

export type BookingProps = {
  id: number;
  order: boolean;
  dateOrder: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
};

export type DeliveryProps = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
};

export type HistoriesProps = {
  id: number;
  userId: number;
};
