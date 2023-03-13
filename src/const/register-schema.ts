import { RetryPasswordValidate } from '../types/registration-form';

export const required = 'Поле не может быть пустым';

export const validatePassword = (fieldValue: RetryPasswordValidate | string): string | boolean =>
  /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(fieldValue as string) ||
  'Пароль не менее 8 символов, с заглавной буквой и цифрой';

export const validateRetryPassword = (fieldValue: RetryPasswordValidate | string) =>
  (fieldValue as RetryPasswordValidate).fieldValue === (fieldValue as RetryPasswordValidate).passwordWatcher ||
  'Пароли не совпадают';

export const validateLogin = (fieldValue: RetryPasswordValidate | string): string | boolean =>
  /^[A-Za-z0-9]+$/.test(fieldValue as string) || 'Используйте для логина латинский алфавит и цифры';

export const validateEmail = (fieldValue: RetryPasswordValidate | string): string | boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValue as string) || 'Введите корректный e-mail';

export const validatePhone = (fieldValue: RetryPasswordValidate | string): string | boolean =>
  /^(\+375|80)\s\((29|25|44|33)\)\s[0-9]{3}-[0-9]{2}-[0-9]/.test(fieldValue as string) ||
  'В формате +375 (xx) xxx-xx-xx';
