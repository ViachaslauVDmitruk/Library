export type RegistrationDataPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
};

export type RegistrationStateTypes = {
  isLoading: boolean;
  isSuccess: boolean;
} & RegistrationError;

export type RegistrationError = {
  errorType: null | 'app' | 'server';
  errorMessage: string;
};
