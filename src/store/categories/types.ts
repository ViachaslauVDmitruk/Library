export type CategoriesState = {
  isLoading: boolean;
  isError: boolean;
  categories: CategoryProps[];
};

export type CategoryProps = {
  name: string;
  path: string;
  id: number | string;
};
