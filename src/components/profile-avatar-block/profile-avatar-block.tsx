import { loginSelector } from '../../selectors';
import { useAppSelector } from '../hooks';

import deafultSrc from './assets/avatar-deafult2.png';
import camera from './assets/camera.png';

import styles from './profile-avatar-block.module.scss';

export const ProfileAvatarBlock = () => {
  const { user } = useAppSelector(loginSelector);

  return (
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
        <span>{user?.firstName}</span>
        <span>{user?.lastName}</span>
      </div>
    </div>
  );
};
