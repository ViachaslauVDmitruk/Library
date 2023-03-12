/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import { regExMail, regExPhone } from '../../../const/reg-ex';
import { required } from '../../../const/register-schema';
import { ErrorFormMessage } from '../../error-form-message';

import styles from '../registration-form.module.scss';

export const RegisterStepThree = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          placeholder='Номер телефона'
          type='tel'
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
          type='email'
          placeholder='E-mail'
          style={errors.email?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='email'>E-mail</label>
        {errors.email?.message && <ErrorFormMessage message={errors.email?.message} />}
      </div>
    </div>
  );
};
