export type ModalStateProps = {
  isLoadingModal: boolean;
  alertMessage: 'success' | 'error' | '';
  message: string;
};

export type ReviewProps = {
  text: string;
  rating: number | null;
  book: string | number;
  user: string | number | null;
};

export type ChangeRevieProps = {
  commentId: number;
} & ReviewProps;
