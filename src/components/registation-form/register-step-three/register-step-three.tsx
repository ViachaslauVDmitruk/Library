/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { regExPhone } from '../../../const/reg-ex';
import { required, validateEmail } from '../../../const/register-schema';
import { ErrorFormMessage } from '../../error-form-message';
import { CustomInput } from '../../input';

import styles from '../registration-form.module.scss';

export const RegisterStepThree = () => {
  const [isFilled, setIsFilled] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const handleFocus = () => setIsFilled(true);

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <InputMask
          id='phone'
          {...register('phone', {
            required,
            pattern: {
              value: regExPhone,
              message: watch('phone').length ? 'В формате +375 (xx) xxx-xx-xx' : 'Поле не может быть пустым',
            },
          })}
          name='phone'
          maskChar='x'
          mask='+375 (99) 999-99-99'
          placeholder='Номер телефона'
          type='tel'
          onFocus={handleFocus}
          style={errors.phone?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='phone'>Номер телефона</label>
        {errors.phone?.message ? (
          <ErrorFormMessage message={errors.phone?.message} />
        ) : (
          <div className={styles.textHelp} data-test-id='hint'>
            В формате +375 (xx) xxx-xx-xx
          </div>
        )}
      </div>
      <div className={styles.lastInput}>
        <CustomInput type='text' name='email' placeholder='E-mail' required={true} validationRules={validateEmail} />
      </div>
    </div>
  );
};
