import styles from './result-message.module.scss';

export const ResultMessage = () => (
  <div className={styles.message} data-test-id='status-block'>
    <h2>Письмо выслано</h2>
    <h3>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</h3>
  </div>
);
