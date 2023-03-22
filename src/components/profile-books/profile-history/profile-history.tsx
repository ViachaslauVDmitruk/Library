import styles from '../profile-books.module.scss';

// type ProfileHistoryProps = {
//   title: string;
//   discription: string;
//   areaText: string;
// };

export const ProfileHistory = () => (
  <div className={styles.container}>
    <div className={styles.wrapperHistory} data-test-id='empty-blue-card'>
      <div className={styles.title}>История</div>
      <div className={styles.discription}>Список прочитанных книг</div>
      <div className={styles.content}>Вы не читали книг из нашей библиотеки</div>
    </div>
  </div>
);
