export type ErrorState = {
  data: null;
  error: ErrorProps;
};

export type ErrorProps = {
  status: number | null;
  name: string;
  message: string;
  details: DetailsProps;
};

export type DetailsProps = {
  discription: string;
};
