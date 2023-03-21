import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { validateEmail } from '../../const/register-schema';
import { loginSelector, recoveryEmailSelector } from '../../selectors';
import { sendRecoveryEmail } from '../../store/recovery-email';
import { RecoveryEmailType } from '../../store/recovery-email/type';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CustomInput } from '../input';
import { Loader } from '../loader';
import { RecoveryPassword } from '../recovery-password';
import { RegisterLoginRow } from '../registation-form/register-login-row';

import arrow from './assets/arrow-back.png';
import { ResultMessage } from './result-message';

import styles from './recovery-form.module.scss';

export const RecoveryForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAppSelector(loginSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forgotPass = searchParams.get('code');
  const { isLoading, isSuccess, isError } = useAppSelector(recoveryEmailSelector);
  const methods = useForm<RecoveryEmailType>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigateToLogin = () => {
    navigate('/auth');
  };
  const onSubmit = (data: RecoveryEmailType) => {
    dispatch(sendRecoveryEmail({ email: data.email }));
  };

  if (forgotPass) {
    return <RecoveryPassword />;
  }

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className={styles.wrapper} style={isSuccess ? { maxWidth: '600px' } : {}}>
      {isLoading && <Loader />}
      {!isSuccess && (
        <Button
          type='button'
          buttonText='Вход в личный кабинет'
          passStyle={styles.toLoginButton}
          src={arrow}
          onClick={navigateToLogin}
        />
      )}
      {!isSuccess && (
        <div className={styles.recoveryWrapper}>
          <h2>Восстановление пароля</h2>
          <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
              <div className={styles.formInput} style={errors.email?.message ? { marginBottom: '15px' } : {}}>
                <CustomInput
                  type='text'
                  name='email'
                  placeholder='E-mail'
                  required={true}
                  validationRules={validateEmail}
                />
              </div>

              <div className={styles.discription}>
                {isError && <span data-test-id='hint'>error</span>}
                На это email будет отправлено письмо с инструкциями по восстановлению пароля
              </div>
              <Button
                disabled={!!Object.keys(errors).length}
                type='submit'
                buttonText='Восстановить'
                passStyle={styles.button}
              />
              <RegisterLoginRow link='/registration' buttonText='Регистрация' text='Нет учётной записи?' />
            </form>
          </FormProvider>
        </div>
      )}
      {isSuccess && <ResultMessage />}
    </div>
  );
};
