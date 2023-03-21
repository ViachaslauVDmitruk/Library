import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type RetryPasswordValidate = {
  fieldValue: string;
  passwordWatcher: string;
};

export type CustomInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  type: 'password' | 'text' | 'tel' | 'email';
  name: string;
  placeholder?: string;
  error?: string | boolean;
  clearActionErrors?: () => void;
  validationRules?: (value: RetryPasswordValidate | string) => string | boolean;
  required?: boolean;
  Customhint?: 'user' | 'password';
  className?: string;
  onFocus?: () => void;
  onChange?: () => void;
  onBlur?: () => void;
  errorMessage?: string;
  defaultValue?: string | number;
  isDirtyField?: boolean;
  helpText?: string;
  customHint?: React.ReactNode;
  lable?: string;
  mask?: string;
  requiredText?: string | '';
  disabled?: boolean;
};
