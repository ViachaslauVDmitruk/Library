import { RootState } from '../store';
import { BookStateProps } from '../store/book/types';
import { BooksState } from '../store/books/types';
import { BurgerStateTypes } from '../store/burger-menu/types';
import { CategoriesState } from '../store/categories/types';
import { InputSearchState } from '../store/input-search/types';
import { LoginStateTypes } from '../store/login/type';
import { DateOrderType } from '../store/order-date/type';
import { ProfileMenuType } from '../store/profile-menu/type';
import { RecoveryEmailProps } from '../store/recovery-email/type';
import { RecoveyPasswordProps } from '../store/recovery-password/type';
import { RegistrationStateTypes } from '../store/registration/type';
import { ModalStateProps } from '../store/review/type';
import { SelectedCategoryState } from '../store/selected-category/types';

export const burgeMenuSelector = (state: RootState): BurgerStateTypes => state.burgerMenu;

export const booksSelector = (state: RootState): BooksState => state.books;

export const oneBookSelector = (state: RootState): BookStateProps => state.onebook;

export const categoriesSelector = (state: RootState): CategoriesState => state.categories;

export const selectedCategorySelector = (state: RootState): SelectedCategoryState => state.selectedCategory;

export const inputSearchSelector = (state: RootState): InputSearchState => state.inputSearch;

export const registrationSelector = (state: RootState): RegistrationStateTypes => state.registration;

export const loginSelector = (state: RootState): LoginStateTypes => state.login;

export const recoveryEmailSelector = (state: RootState): RecoveryEmailProps => state.recoveryEmail;

export const recoveryPasswordSelector = (state: RootState): RecoveyPasswordProps => state.recoveryPassword;

export const profileMenuSelector = (state: RootState): ProfileMenuType => state.profileMenu;

export const reviewSelector = (state: RootState): ModalStateProps => state.review;

export const bookingSelector = (state: RootState): ModalStateProps => state.booking;

export const dateOrderSelector = (state: RootState): DateOrderType => state.dateOrder;

export const changedRegisterSelector = (state: RootState): ModalStateProps => state.changedRegister;
