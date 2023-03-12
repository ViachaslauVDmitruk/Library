/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { regExPassword, regExUsername } from '../../../const/reg-ex';
import { required } from '../../../const/register-schema';
import { ColorPasswordMatch, ColorUserMatch } from '../../color-input-help';
import { ErrorFormMessage } from '../../error-form-message';

import check from './assets/check.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from '../registration-form.module.scss';

export const RegisterStepOne = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    register,
    formState: { errors, isDirty },
    watch,
  } = useFormContext();

  console.log('useFormContext', useFormContext());

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <input
          id='username'
          {...register('username', {
            required,
            pattern: {
              value: regExUsername,
              message: '',
            },
          })}
          name='username'
          placeholder=' Придумайте логин для входа'
          type='text'
          style={errors.username?.message ? { borderBottom: '1px solid red' } : {}}
        />

        <label htmlFor='username'>Придумайте логин для входа</label>
        {errors.username?.message && <ErrorFormMessage message={errors.username?.message} />}
        {(!errors.username || isDirty) && <ColorUserMatch inputValue={watch('username')} />}
      </div>
      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input
          id='password'
          {...register('password', {
            required,
            pattern: {
              value: regExPassword,
              message: '',
            },
          })}
          name='password'
          type={isShowPassword ? 'text' : 'password'}
          placeholder='Пароль'
          style={errors.password?.message ? { borderBottom: '1px solid red' } : {}}
        />

        <label htmlFor='password'>Пароль</label>
        {errors.password?.message && <ErrorFormMessage message={errors.password?.message} />}
        <div className={styles.eyeImage} onClick={ShowPassword}>
          {!errors.password && isDirty && <img src={check} alt='img' data-test-id='checkmark' />}
          <img
            src={isShowPassword ? eyeOpen : eyeClose}
            alt='img'
            data-test-id={isShowPassword ? 'opened' : 'eye-closed'}
          />
        </div>
        {(!errors.password || isDirty) && (
          <ColorPasswordMatch isError={errors.password} inputValue={watch('password')} />
        )}
      </div>
    </div>
  );
};
