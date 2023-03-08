import { RootState } from '../store';
import { BookStateProps } from '../store/book/types';
import { BooksState } from '../store/books/types';
import { BurgerStateTypes } from '../store/burger-menu/types';
import { CategoriesState } from '../store/categories/types';
import { InputSearchState } from '../store/input-search/types';
import { RegistrationStateTypes } from '../store/registration/type';
import { SelectedCategoryState } from '../store/selected-category/types';

export const burgeMenuSelector = (state: RootState): BurgerStateTypes => state.burgerMenu;

export const booksSelector = (state: RootState): BooksState => state.books;

export const oneBookSelector = (state: RootState): BookStateProps => state.onebook;

export const categoriesSelector = (state: RootState): CategoriesState => state.categories;

export const selectedCategorySelector = (state: RootState): SelectedCategoryState => state.selectedCategory;

export const inputSearchSelector = (state: RootState): InputSearchState => state.inputSearch;

export const registrationSelector = (state: RootState): RegistrationStateTypes => state.registration;
