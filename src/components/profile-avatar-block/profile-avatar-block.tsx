/* eslint-disable no-debugger */
import { avatarSelector, loginSelector } from '../../selectors';
import { sendAvatarData } from '../../store/avatar';
import { AlertMessage } from '../error-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';

import deafultSrc from './assets/avatar-deafult2.png';
import camera from './assets/camera.png';

import styles from './profile-avatar-block.module.scss';

export const ProfileAvatarBlock = () => {
  const { user } = useAppSelector(loginSelector);
  const { isLoadingModal, alertMessage, message } = useAppSelector(avatarSelector);
  const dispatch = useAppDispatch();

  const changeAvatar = (file: FileList | null) => {
    if (file) {
      dispatch(sendAvatarData(file));
    }
  };

  return (
    <div className={styles.container}>
      {message && <AlertMessage stylesAlert={alertMessage} message={message} />}
      {isLoadingModal && <Loader />}
      <div className={styles.imageProfile}>
        <div className={styles.avatarWrapper}>
          <img src={deafultSrc} alt='img' />
        </div>
        <div className={styles.cameraWrapper}>
          <img src={camera} alt='img' />
        </div>
        <input
          accept='image/*,.png,.web,.jpg,.gif'
          onChange={(e) => changeAvatar(e.target.files)}
          id='avater'
          type='file'
          placeholder='avatar'
          className={styles.fileInput}
        />
      </div>
      <div className={styles.nameProfile}>
        <span>{user?.firstName}</span>
        <span>{user?.lastName}</span>
      </div>
    </div>
  );
};
