import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { NavigateList } from '../../components/navigate-list';
import { ProfileAvatarBlock } from '../../components/profile-avatar-block';
import { ProfileBooking } from '../../components/profile-books/profile-booking';
import { ProfileHistory } from '../../components/profile-books/profile-history';
import { ProfileOnHands } from '../../components/profile-books/profile-on-hands';
import { ProfileInformation } from '../../components/profile-information';
import { burgeMenuSelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';
import { getUserData } from '../../store/user-data';

import styles from './profile.module.scss';

export const Profile = () => {
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getUserData());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      {activeBurger && <NavigateList />}
      <ProfileAvatarBlock />
      <ProfileInformation />
      <ProfileBooking />
      <ProfileOnHands />
      <ProfileHistory />
    </div>
  );
};
