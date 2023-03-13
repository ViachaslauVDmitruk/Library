export type RecoveyPasswordProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
} & RecoveryPasswordType;

export type RecoveryPasswordType = {
  password: string;
  passwordConfirmation: string;
  code: string | null;
};
