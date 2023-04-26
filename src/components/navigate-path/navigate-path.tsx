/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useNavigate } from 'react-router-dom';

import { selectedCategorySelector } from '../../selectors';
import { useAppSelector } from '../hooks';

import styles from './navigate-path.module.scss';

type PathProps = {
  title: string | '';
};

export const NavigatePath = ({ title }: PathProps) => {
  const { selectedCategory, pathCategory } = useAppSelector(selectedCategorySelector);
  const navigate = useNavigate();
  const goBackUrl = () => {
    if (selectedCategory) {
      navigate(`/books/${pathCategory}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.navigatePath}>
      <div className={styles.container}>
        <span data-test-id='breadcrumbs-link' onClick={goBackUrl} style={{ cursor: 'pointer' }}>
          {selectedCategory ? selectedCategory : 'Все книги'}
        </span>{' '}
        <span>/</span> <span data-test-id='book-name'>{title}</span>
      </div>
    </div>
  );
};
