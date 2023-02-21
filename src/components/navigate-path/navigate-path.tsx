import styles from './navigate-path.module.scss';

type PathProps = {
  categories: string[];
  title: string;
};

export const NavigatePath = ({ categories, title }: PathProps) => (
  <div className={styles.navigatePath}>
    <div className={styles.container}>
      <span data-test-id='breadcrumbs-link'>{categories.length >= 1 ? categories[0] : 'Все книги'}</span> <span>/</span>{' '}
      <span data-test-id='book-name'>{title}</span>
    </div>
  </div>
);
