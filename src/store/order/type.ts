export type BookingDataProps = {
  [x: string]: any;
  order: boolean;
  dateOrder: Date | string;
  book: string | number;
  customer: string | number;
};

export type BookingIdChangedTypes = {
  bookingId: string | number;
} & BookingDataProps;

export type BookingIdTypes = {
  bookingId: string | number;
  bookIdUpdate: string | number;
};
