/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useNavigate } from 'react-router-dom';
import { selectedCategorySelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { useAppDispatch, useAppSelector } from '../hooks';

import styles from './navigate-path.module.scss';

type PathProps = {
  categories: string[];
  title: string;
};

export const NavigatePath = ({ categories, title }: PathProps) => {
  const { selectedCategory } = useAppSelector(selectedCategorySelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const goBackUrl = () => {
    dispatch(getBooks());
    navigate(-1);
  };

  return (
    <div className={styles.navigatePath}>
      <div className={styles.container}>
        <span data-test-id='breadcrumbs-link' onClick={() => goBackUrl()} style={{ cursor: 'pointer' }}>
          {selectedCategory ? selectedCategory : 'Все книги'}
        </span>{' '}
        <span>/</span> <span data-test-id='book-name'>{title}</span>
      </div>
    </div>
  );
};
