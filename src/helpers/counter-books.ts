import { BookProps } from '../store/books/types';

type CounterProps = {
  name: string;
  books: BookProps[];
};

export const CounterBooks = ({ name, books }: CounterProps) => {
  let counter = 0;

  books?.forEach(({ categories }) => {
    if (categories.includes(name)) {
      counter += 1;
    }
  });

  return counter;
};
