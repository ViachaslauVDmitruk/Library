export type CategoriesState = {
  isLoadingCategories: boolean;
  isErrorCategories: boolean;
  categories: CategoryProps[];
};

export type CategoryProps = {
  name: string;
  path: string;
  id: number | string;
};
