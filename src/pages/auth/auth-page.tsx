import styles from './auth-page.module.scss';

type AuthProps = {
  children: React.ReactNode;
};

export const AuthPage = ({ children }: AuthProps) => (
  <div className={styles.authPage} data-test-id='auth'>
    <div className={styles.title}>Cleverland</div>
    <div className={styles.formContainer}>{children}</div>
  </div>
);
