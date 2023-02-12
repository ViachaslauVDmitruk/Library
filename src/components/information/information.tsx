import classNames from 'classnames';

import styles from './information.module.scss';

export const Information = () => (
  <div className={styles.container}>
    <div className={styles.information}>
      <div className={styles.title}>Подробная информация</div>
      <div className={styles.parametrs}>
        <div className={classNames(styles.parametrsItems, styles.firstItem)}>
          <div className={styles.discribe}>Издательство</div>
          <div className={styles.text}>Питер</div>
          <div className={styles.discribe}>Год издания</div>
          <div className={styles.text}>2019</div>
          <div className={styles.discribe}>Страниц</div>
          <div className={styles.text}>288</div>
          <div className={styles.discribe}>Переплет</div>
          <div className={styles.text}>Мягкая обложка</div>
          <div className={styles.discribe}>Формат</div>
          <div className={styles.text}>70х100</div>
        </div>
        <div className={classNames(styles.parametrsItems, styles.secondItem)}>
          <div className={styles.discribe}>Жанр</div>
          <div className={styles.text}>Компьютерная литература</div>
          <div className={styles.discribe}>Вес</div>
          <div className={styles.text}>380г</div>
          <div className={styles.discribe}>ISBN</div>
          <div className={styles.text}>978-5-4461-0923-4</div>
          <div className={styles.discribe}>Изготовитель</div>
          <div className={styles.text}>
            ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
          </div>
        </div>
      </div>
    </div>
  </div>
);
