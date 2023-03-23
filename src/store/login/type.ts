export type LoginStateTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  user: UserType | null;
} & LoginError;

export type UserType = {
  id: number | '';
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: RoleType;
  comments: CommentsType[];
  avatar: string | null;
  booking: BookingUserType | null;
  delivery: DeliveryUserType | null;
  history: HistoryType | null;
};

export type RoleType = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type CommentsType = {
  id: number;
  rating: number;
  text: string | null;
  bookId: number;
};

export type BookingUserType = {
  id: number;
  order: boolean;
  dateOrder: string;
  book: BookPropsType;
};

export type BookPropsType = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: string[];
  image: string | null;
};

export type Credentials = {
  identifier: string;
  password: string;
};

export type LoginResponseType = {
  jwt: string;
  user: UserType;
};

export type LoginErrorResponseType = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
};

export type DeliveryUserType = {
  id: number;
  handed: false;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: BookPropsType;
};

export type HistoryType = {
  id: number;
  books: BookPropsType[];
};

export type LoginError = {
  errorType: null | 'app' | 'server';
  errorMessage: string;
};
