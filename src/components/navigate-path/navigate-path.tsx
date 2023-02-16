import styles from './navigate-path.module.scss';

type PathProps = {
  categories: string[];
  title: string;
};

export const NavigatePath = ({ categories, title }: PathProps) => (
  <div className={styles.navigatePath}>
    <div className={styles.container}>
      {categories.length >= 1 ? categories[0] : 'Все книги'} <span>/</span> {title}
    </div>
  </div>
);
