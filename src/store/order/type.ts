export type BookingDataProps = {
  [x: string]: any;
  order: boolean;
  dateOrder: Date | string;
  book: string | number;
  customer: string | number;
};

export type BookingIdTypes = {
  bookingId: string | number;
  bookIdUpdate: string | number;
};
