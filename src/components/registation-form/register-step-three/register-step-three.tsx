/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { regExMail, regExPhone } from '../../../const/reg-ex';
import { RegisterSchemaThree, required } from '../../../const/register-schema';
import { Button } from '../../button';
import { ErrorFormMessage } from '../../error-form-message';
import { RegisterLoginRow } from '../register-login-row';

import styles from '../registration-form.module.scss';

export const RegisterStepThree = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  //   {yupResolver(RegisterSchemaThree)}

  console.log('step 3');

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <InputMask
          id='phone'
          {...register('phone', {
            required,
            pattern: {
              value: regExPhone,
              message: 'В формате +375 (хх) ххх-хх-хх',
            },
          })}
          name='phone'
          mask='+375 (99) 999-99-99'
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
          {...register('email', {
            required,
            pattern: {
              value: regExMail,
              message: 'Введите корректный e-mail',
            },
          })}
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
    </div>
  );
};
