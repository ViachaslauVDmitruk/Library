import { RootState } from '../store';
import { BookStateProps } from '../store/book/types';
import { BooksState } from '../store/books/types';
import { BurgerStateTypes } from '../store/burger-menu/types';
import { CategoriesState } from '../store/categories/types';

export const burgeMenuSelector = (state: RootState): BurgerStateTypes => state.burgerMenu;

export const booksSelector = (state: RootState): BooksState => state.books;

export const oneBookSelector = (state: RootState): BookStateProps => state.onebook;

export const categoriesSelector = (state: RootState): CategoriesState => state.categories;
