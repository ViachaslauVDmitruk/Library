import styles from './error-form-message.module.scss';

type ErrorProps = {
  message: any;
};

export const ErrorFormMessage = ({ message }: ErrorProps) => (
  <div className={styles.error} data-test-id='hint'>
    {message}
  </div>
);
