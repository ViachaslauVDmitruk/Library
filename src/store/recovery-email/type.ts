export type RecoveryEmailProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;

  successMessage: string;
} & RecoveryEmailType;

export type RecoveryEmailType = {
  email: string;
};
