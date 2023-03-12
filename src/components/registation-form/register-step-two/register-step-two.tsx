/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { required } from '../../../const/register-schema';
import { ErrorFormMessage } from '../../error-form-message';

import styles from '../registration-form.module.scss';

export const RegisterStepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <input
          id='firstName'
          {...register('firstName', {
            required,
          })}
          name='firstName'
          placeholder='Имя'
          type='text'
          style={errors.firstName?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='firstName'>Имя</label>
        {errors.firstName?.message && <ErrorFormMessage message={errors.firstName?.message} />}
      </div>
      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input
          id='lastName'
          {...register('lastName', {
            required,
          })}
          name='lastName'
          type='text'
          placeholder='Фамилия'
          style={errors.lastName?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='lastName'>Фамилия</label>
        {errors.lastName?.message && <ErrorFormMessage message={errors.lastName?.message} />}
      </div>
    </div>
  );
};
