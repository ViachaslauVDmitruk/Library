import { ProfileHistoryBlock } from '../../components/profile-history-block';
import { PROFILE_STATE_BLOCK } from '../../const/profile-history-block';

import deafultSrc from './assets/avatar-deafult2.png';
import camera from './assets/camera.png';

import styles from './profile.module.scss';

export const Profile = () => (
  <div className={styles.profile}>
    <div className={styles.container}>
      <div className={styles.information}>
        <div className={styles.imageProfile}>
          <div className={styles.avatarWrapper}>
            <img src={deafultSrc} alt='img' />
          </div>
          <div className={styles.cameraWrapper}>
            <img src={camera} alt='img' />
          </div>
        </div>
      </div>
      <div className={styles.nameProfile}>
        <span>Коля</span>
        <span>Рефріжіратор</span>
      </div>
    </div>
    {PROFILE_STATE_BLOCK.map(({ title, discription, areaText, id }) => (
      <ProfileHistoryBlock title={title} discription={discription} areaText={areaText} key={id} />
    ))}
  </div>
);
