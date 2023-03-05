export type FormData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type RegisterStepProps = {
  step: number;
  setStep: (step: number) => void;
};
