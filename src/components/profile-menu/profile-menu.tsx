import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { profileMenuSelector } from '../../selectors';
import { loginResetState } from '../../store/login';
import { closeProfileMenu } from '../../store/profile-menu';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';

import styles from './profile-menu.module.scss';

export const ProfileMenu = () => {
  const { isOpenProfileMenu } = useAppSelector(profileMenuSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    //  localStorage.removeItem('token');
    //  localStorage.removeItem('user');
    //  dispatch(loginResetState());
    //  navigate('/auth');
    navigate('/');
    dispatch(closeProfileMenu());
  };

  const flowProfile = () => {
    dispatch(closeProfileMenu());
    navigate('/profile');
  };

  return (
    <div className={classNames(styles.profile, { [styles.visible]: isOpenProfileMenu })}>
      <Button buttonText='Профиль' type='button' passStyle={styles.button} onClick={flowProfile} id='profile-button' />
      <Button buttonText='Выход' type='button' passStyle={styles.button} onClick={logOut} />
    </div>
  );
};
