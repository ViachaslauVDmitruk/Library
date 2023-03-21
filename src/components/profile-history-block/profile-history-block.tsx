import styles from './profile-history-block.module.scss';

type ProfileHistoryProps = {
  title: string;
  discription: string;
  areaText: string;
};

export const ProfileHistoryBlock = ({ title, discription, areaText }: ProfileHistoryProps) => (
  <div className={styles.container}>
    <div className={styles.wrapperHistory} data-test-id='empty-blue-card'>
      <div className={styles.title}>{title}</div>
      <div className={styles.discription}>{discription}</div>
      <div className={styles.content}>{areaText}</div>
    </div>
  </div>
);
