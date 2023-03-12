import * as yup from 'yup';
import { RetryPasswordValidate } from '../types/registration-form';

import { regExPassword } from './reg-ex';

export const required = 'Поле не может быть пустым';

export const recoveryPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(regExPassword, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .required(required),
  passwordConfirmation: yup
    .string()
    .required(required)
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const validatePassword = (fieldValue: RetryPasswordValidate | string): string | boolean =>
  /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(fieldValue as string) || '';

export const validateRetryPassword = (fieldValue: RetryPasswordValidate | string) =>
  (fieldValue as RetryPasswordValidate).fieldValue === (fieldValue as RetryPasswordValidate).passwordWatcher ||
  'Пароли не совпадают';
