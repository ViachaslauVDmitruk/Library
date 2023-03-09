export type LoginStateTypes = {
  isLoading: boolean;
  isSuccess: boolean;
  user: UserType | null;
} & LoginError;

export type UserType = {
  id: number;
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

export type LoginError = {
  errorType: null | 'app' | 'server';
  errorMessage: string;
};
