import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { regExMail } from '../../const/reg-ex';
import { required } from '../../const/register-schema';
import { recoveryEmailSelector } from '../../selectors';
import { sendRecoveryEmail } from '../../store/recovery-email';
import { RecoveryEmailType } from '../../store/recovery-email/type';
import { Button } from '../button';
import { ErrorFormMessage } from '../error-form-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';
import { RegisterLoginRow } from '../registation-form/register-login-row';
import arrow from './assets/arrow-back.png';

import styles from './recovery-form.module.scss';
import { ResultMessage } from './result-message';

export const RecoveryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = useAppSelector(recoveryEmailSelector);
  const methods = useForm<RecoveryEmailType>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigateToLogin = () => {
    navigate('/auth');
  };
  const onSubmit = (data: RecoveryEmailType) => {
    console.log('data recovery', data);
    dispatch(sendRecoveryEmail({ email: data.email }));
  };

  return (
    <div className={styles.wrapper} style={isSuccess ? { maxWidth: '600px' } : {}}>
      {isLoading && <Loader />}
      <Button
        type='button'
        buttonText='Вход в личный кабинет'
        passStyle={styles.toLoginButton}
        src={arrow}
        onClick={navigateToLogin}
      />
      <div className={styles.recoveryWrapper}>
        <h2>Восстановление пароля</h2>
        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
            <div className={styles.formInput} style={errors.email?.message ? { marginBottom: '15px' } : {}}>
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
                placeholder=' '
                style={errors.email?.message ? { borderBottom: '1px solid red' } : {}}
              />
              <label htmlFor='email'>E-mail</label>
              {errors.email?.message && <ErrorFormMessage message={errors.email?.message} />}
            </div>
            <div className={styles.discription}>
              На это email будет отправлено письмо с инструкциями по восстановлению пароля
            </div>
            <Button type='submit' buttonText='Восстановить' passStyle={styles.button} />
            <RegisterLoginRow link='/registration' buttonText='Регистрация' text='Нет учётной записи?' />
          </form>
        </FormProvider>
      </div>
      {/* <ResultMessage /> */}
    </div>
  );
};
