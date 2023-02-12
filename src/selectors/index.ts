import { RootState } from '../store';
import { BooksState } from '../store/books/types';
import { BurgerStateTypes } from '../store/burger-menu/types';

export const burgeMenuSelector = (state: RootState): BurgerStateTypes => state.burgerMenu;

export const booksSelector = (state: RootState): BooksState => state.books;
