/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { regExMail, regExPhone } from '../../../const/reg-ex';
import { Button } from '../../button';
import { ErrorFormMessage } from '../../error-form-message';
import { RegisterLoginRow } from '../register-login-row';

import styles from '../registration-form.module.scss';

const schema = yup
  .object({
    email: yup.string().matches(regExMail, 'неверный E-mail').required('поле должно быть заполнено'),
    phone: yup.string().matches(regExPhone, 'введите нормер телефона').required('поле должно быть заполнено'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const RegisterStepThree = () => {
  const {
    register,
    handleSubmit,

    formState: { touchedFields, errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log('data', data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInput}>
        <InputMask
          id='phone'
          {...register('phone')}
          name='phone'
          mask='+375 (99) 9999999'
          placeholder=' '
          type='text'
          style={errors.phone?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='phone'>Номер телефона</label>
        {errors.phone?.message && <ErrorFormMessage message={errors.phone?.message} />}
      </div>
      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input
          id='email'
          {...register('email')}
          name='email'
          type='text'
          placeholder=' '
          style={errors.email?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='email'>E-mail</label>
        {errors.email?.message && <ErrorFormMessage message={errors.email?.message} />}
      </div>
      <Button buttonText='Зарегистрироваться' type='submit' passStyle={styles.button} />
      <RegisterLoginRow />
    </form>
  );
};
