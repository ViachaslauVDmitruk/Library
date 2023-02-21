export type CardProps = {
  src: CardImages | null;
  rating: number | null;
  title: string;
  authors: string[];
  id: number;
  issueYear: string;
  searchValue: string;
};
export type CardImages = {
  url: string | null;
};
