import { Link, useParams } from 'react-router-dom';

import { API_HOST } from '../../../api/const';
import { CardProps } from '../../../types/card';
import { StarsRating } from '../../stars-rating';
import noImage from '../assets/no-image.png';

import styles from './card-list-view.module.scss';

export const CardListView = ({ src, rating, title, authors, id, issueYear }: CardProps) => {
  const { category } = useParams();

  return (
    <Link to={`/books/${category}/${id}`} data-test-id='card' className={styles.cardList} key={id}>
      <div className={styles.image}>
        <img src={src?.url == null ? noImage : `${API_HOST}${src?.url}`} alt='img' />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>
          {authors.map((item) => (
            <span>{item},</span>
          ))}
          <span>{issueYear}</span>
        </div>
        <div className={styles.ratingButton}>
          {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
          <button type='button' className={styles.button}>
            Забронировать
          </button>
        </div>
      </div>
    </Link>
  );
};
