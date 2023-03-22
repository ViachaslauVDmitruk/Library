/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';

import { API, API_HOST } from '../../api/const';
import { avatarSelector, loginSelector, userSelector } from '../../selectors';
import { sendAvatarData } from '../../store/avatar';
import { AlertMessage } from '../error-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';

import deafultSrc from './assets/avatar-deafult2.png';
import camera from './assets/camera.png';

import styles from './profile-avatar-block.module.scss';

export const ProfileAvatarBlock = () => {
  const [avatarScr, setAvatarSrc] = useState<string>(deafultSrc);
  const { user } = useAppSelector(userSelector);
  const { isLoadingModal, alertMessage, message } = useAppSelector(avatarSelector);
  const dispatch = useAppDispatch();

  const changeAvatar = (file: FileList | null) => {
    if (file) {
      dispatch(sendAvatarData({ avatar: file, userId: user?.id }));
    }
  };

  useEffect(() => {
    if (user?.avatar) {
      setAvatarSrc(`${API_HOST}${user.avatar}`);
    } else {
      setAvatarSrc(deafultSrc);
    }
  }, [user]);

  return (
    <div className={styles.container} data-test-id='profile-avatar'>
      {message && <AlertMessage stylesAlert={alertMessage} message={message} />}
      {isLoadingModal && <Loader />}
      <div className={styles.imageProfile}>
        <div className={styles.avatarWrapper}>
          <img src={avatarScr} alt='img' />
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
