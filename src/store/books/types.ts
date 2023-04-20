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
  booking: BookingProps | null;
  delivery: DeliveryProps | null;
  histories: HistoriesProps[] | null;
};

export type ImageProps = {
  url: string | null;
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
