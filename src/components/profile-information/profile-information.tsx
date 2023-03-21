/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import { regExPhone } from '../../const/reg-ex';
import { validateEmail, validateLogin, validatePassword } from '../../const/register-schema';
import { changedRegisterSelector, loginSelector } from '../../selectors';
import { sendChangedRegisterData } from '../../store/user';
import { ChangedRegisterDataPayload } from '../../store/user/type';
import { FormData } from '../../types/registration-form';
import { Button } from '../button';
import { ErrorFormMessage } from '../error-form-message';
import { AlertMessage } from '../error-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CustomInput } from '../input';

import check from './assets/check.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './profile-information.module.scss';

export const ProfileInformation = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isDisabledInput, setIsDisableInput] = useState<boolean>(true);
  const { isLoadingModal, alertMessage, message } = useAppSelector(changedRegisterSelector);
  const { user } = useAppSelector(loginSelector);
  const [isFilled, setIsFilled] = useState(false);
  const dispatch = useAppDispatch();
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const redactInputs = () => {
    setIsDisableInput(false);
  };

  const methods = useForm<ChangedRegisterDataPayload>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = methods;

  const handleFocus = () => setIsFilled(true);

  const onSubmit = (data: ChangedRegisterDataPayload) => {
    dispatch(
      sendChangedRegisterData({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        phone: data.phone,
        email: data.email,
        userId: user?.id ?? '',
      })
    );
  };

  return (
    <FormProvider {...methods}>
      {message && <AlertMessage stylesAlert={alertMessage} message={message} />}
      <form className={styles.container} data-test-id='profile-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>Учётные данные</div>
        <div className={styles.discription}>Здесь вы можете отредактировать информацию о себе</div>
        <div className={styles.inputsWrapper}>
          <CustomInput
            type='text'
            placeholder='Придумайте логин для входа'
            required={true}
            validationRules={validateLogin}
            Customhint='user'
            name='username'
            disabled={isDisabledInput}
          />

          <div className={styles.wrapperInput}>
            <CustomInput
              type={isShowPassword ? 'text' : 'password'}
              name='password'
              placeholder='Новый пароль'
              required={true}
              validationRules={validatePassword}
              Customhint='password'
              disabled={isDisabledInput}
            />
            <div className={styles.eyeImage} onClick={ShowPassword}>
              {watch('password').length > 7 && <img src={check} alt='img' data-test-id='checkmark' />}
              <img
                src={isShowPassword ? eyeOpen : eyeClose}
                alt='img'
                data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
              />
            </div>
          </div>
          <CustomInput type='text' name='firstName' placeholder='Имя' required={false} disabled={isDisabledInput} />

          <CustomInput type='text' name='lastName' placeholder='Фамилия' required={false} disabled={isDisabledInput} />

          <div className={styles.formInput}>
            <InputMask
              id='phone'
              {...register('phone', {
                required: false,
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
              disabled={isDisabledInput}
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
          <CustomInput
            type='text'
            name='email'
            placeholder='E-mail'
            required={true}
            validationRules={validateEmail}
            disabled={isDisabledInput}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            type='button'
            buttonText='Редактировать'
            passStyle={classNames(styles.button, styles.redaction)}
            data-test-id='edit-button'
            onClick={redactInputs}
          />
          <Button
            type='submit'
            disabled={isDisabledInput}
            buttonText='Сохранить изменения'
            passStyle={styles.button}
            data-test-id='save-button'
          />
        </div>
      </form>
    </FormProvider>
  );
};
