export type FormData = {
  login: string;
  password: string;
  retryPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type RegisterStepProps = {
  step: number;
  setStep: (step: number) => void;
};
