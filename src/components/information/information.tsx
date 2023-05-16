import classNames from 'classnames';

import { oneBookSelector } from '../../selectors';
// import { BookProps } from '../../store/books/types';
import { useAppSelector } from '../hooks';

import styles from './information.module.scss';
import { OneBookProps } from '../../store/book/types';

type BookProps = {
  publish: string | null | undefined;
  issueYear: string | undefined;
  pages: string | null | undefined;
  cover: string | null | undefined;
  format: string | null | undefined;
  categories: string[] | undefined;
  weight: string | null | undefined;
  ISBN: string | null | undefined;
  producer: string | null | undefined;
};

export const Information = ({
  publish,
  issueYear,
  cover,
  format,
  pages,
  categories,
  weight,
  ISBN,
  producer,
}: BookProps) => (
  //   const { book } = useAppSelector(oneBookSelector);

  <div className={styles.container}>
    <div className={styles.information}>
      <div className={styles.title}>Подробная информация</div>
      <div className={styles.parametrs}>
        <div className={classNames(styles.parametrsItems, styles.firstItem)}>
          <div className={styles.discribe}>Издательство</div>
          <div className={styles.text}>{publish}</div>
          <div className={styles.discribe}>Год издания</div>
          <div className={styles.text}>{issueYear}</div>
          <div className={styles.discribe}>Страниц</div>
          <div className={styles.text}>{pages}</div>
          <div className={styles.discribe}>Переплет</div>
          <div className={styles.text}>{cover}</div>
          <div className={styles.discribe}>Формат</div>
          <div className={styles.text}>{format}</div>
        </div>
        <div className={classNames(styles.parametrsItems, styles.secondItem)}>
          <div className={styles.discribe}>Жанр</div>
          <div className={styles.text}>
            {categories?.map((item) => (
              <span key={item}>{item},</span>
            ))}
          </div>
          <div className={styles.discribe}>Вес</div>
          <div className={styles.text}>{weight}</div>
          <div className={styles.discribe}>ISBN</div>
          <div className={styles.text}>{ISBN}</div>
          <div className={styles.discribe}>Изготовитель</div>
          <div className={styles.text}>{producer}</div>
        </div>
      </div>
    </div>
  </div>
);
