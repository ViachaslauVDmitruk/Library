import classNames from 'classnames';

import { oneBookSelector } from '../../selectors';
import { useAppSelector } from '../hooks';

import styles from './information.module.scss';

export const Information = () => {
  const { book } = useAppSelector(oneBookSelector);

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <div className={styles.title}>Подробная информация</div>
        <div className={styles.parametrs}>
          <div className={classNames(styles.parametrsItems, styles.firstItem)}>
            <div className={styles.discribe}>Издательство</div>
            <div className={styles.text}>{book.publish}</div>
            <div className={styles.discribe}>Год издания</div>
            <div className={styles.text}>{book.issueYear}</div>
            <div className={styles.discribe}>Страниц</div>
            <div className={styles.text}>{book.pages}</div>
            <div className={styles.discribe}>Переплет</div>
            <div className={styles.text}>{book.cover}</div>
            <div className={styles.discribe}>Формат</div>
            <div className={styles.text}>{book.format}</div>
          </div>
          <div className={classNames(styles.parametrsItems, styles.secondItem)}>
            <div className={styles.discribe}>Жанр</div>
            <div className={styles.text}>
              {book.categories?.map((item) => (
                <span key={item}>{item},</span>
              ))}
            </div>
            <div className={styles.discribe}>Вес</div>
            <div className={styles.text}>{book.weight}</div>
            <div className={styles.discribe}>ISBN</div>
            <div className={styles.text}>{book.ISBN}</div>
            <div className={styles.discribe}>Изготовитель</div>
            <div className={styles.text}>{book.producer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
