import styles from '../profile-books.module.scss';

export const ProfileOnHands = () => (
  <div className={styles.container}>
    <div className={styles.wrapperHistory} data-test-id='empty-blue-card'>
      <div className={styles.title}>Книга которую взяли</div>
      <div className={styles.discription}>Здесь можете просмотреть информацию о книге и узнать сроки возврата</div>
      <div className={styles.content}>Прочитав книгу, она отобразится в истории </div>
    </div>
  </div>
);
