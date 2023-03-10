import * as yup from 'yup';

import { regExMail, regExPassword, regExPhone, regExUsername } from './reg-ex';

export const required = 'поле не может быть пустым';

export const RegisterSchemaTwo = yup
  .object()
  .shape({
    firstname: yup.string().required(required),
    lastname: yup.string().required(required),
  })
  .required();

export const RegisterSchemaThree = yup
  .object()
  .shape({
    email: yup.string().matches(regExMail, 'неверный E-mail').required(required),
    phone: yup.string().matches(regExPhone, 'введите нормер телефона').required(required),
  })
  .required();

export const schema = yup.object().shape({
  username: yup.string().matches(regExUsername, 'не соответствует требованию').required(required),
  password: yup.string().matches(regExPassword, 'не соответствует требованию').required(required),
  firstname: yup.string().required(required),
  lastname: yup.string().required(required),
  email: yup.string().matches(regExMail, 'Введите корректный e-mail').required(required),
  phone: yup.string().matches(regExPhone, 'В формате +375 (хх) ххх-хх-хх').required(required),
});

export const recoveryPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(regExPassword, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .required('Поле не может быть пустым'),
  passwordConfirmation: yup
    .string()
    .required('Поле не может быть пустым')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});
