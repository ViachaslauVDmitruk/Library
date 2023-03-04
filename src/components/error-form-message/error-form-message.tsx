import styles from './error-form-message.module.scss';

type ErrorProps = {
  message: string;
};

export const ErrorFormMessage = ({ message }: ErrorProps) => <div className={styles.error}>{message}</div>;
