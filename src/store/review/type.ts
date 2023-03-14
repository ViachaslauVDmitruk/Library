export type ReviewStateProps = {
  isLoading: boolean;
  alertMessage: 'success' | 'error' | '';
  message: string;
};

export type ReviewProps = {
  text: string;
  rating: number;
  book: string | number;
  user: string | number;
};
