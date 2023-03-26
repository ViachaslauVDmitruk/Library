import { useEffect } from 'react';

import { AlertMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { ProfileAvatarBlock } from '../../components/profile-avatar-block';
import { ProfileBooking } from '../../components/profile-books/profile-booking';
import { ProfileHistory } from '../../components/profile-books/profile-history';
import { ProfileOnHands } from '../../components/profile-books/profile-on-hands';
import { ProfileInformation } from '../../components/profile-information';
import { alertSelector, booksSelector, burgeMenuSelector, categoriesSelector, userSelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';
import { getUserData } from '../../store/user-data';

import styles from './profile.module.scss';

export const Profile = () => {
  const { isLoadingUser, isErrorUserResponse } = useAppSelector(userSelector);
  const { isLoadingBooks, isErrorBooks } = useAppSelector(booksSelector);
  const { isLoadingCategories, isErrorCategories } = useAppSelector(categoriesSelector);
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { alertMessage, message } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();
  //   const error = isErrorBooks || isErrorCategories || isErrorUserResponse;
  const loading = isLoadingBooks || isLoadingCategories || isLoadingUser;

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getUserData());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      {loading && <Loader />}
      {alertMessage && <AlertMessage stylesAlert={alertMessage} message={message} />}
      {activeBurger && <NavigateList />}
      <ProfileAvatarBlock />
      <ProfileInformation />
      <ProfileBooking />
      <ProfileOnHands />
      <ProfileHistory />
    </div>
  );
};
