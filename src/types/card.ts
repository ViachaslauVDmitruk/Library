export type CardProps = {
  src: CardImages | null;
  //   src: string[];
  rating: number | null;
  title: string;
  authors: string[];
  id: number;
  issueYear: string;
};
export type CardImages = {
  url: string | null;
};
