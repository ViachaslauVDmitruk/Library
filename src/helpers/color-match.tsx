import React from 'react';

type ColorMatchProps = {
  searchValue: string;
  title: string;
};

export const ColorMatch = ({ searchValue, title }: ColorMatchProps) => {
  if (!searchValue) return title;
  const regexp = new RegExp(searchValue, 'ig');
  const matchSearchValue = title.match(regexp);

  if (matchSearchValue) {
    return title.split(regexp).map((s, index, arr) => {
      if (index < arr.length - 1) {
        const colorStr = matchSearchValue.shift();

        return (
          <React.Fragment>
            <span>{s}</span>
            <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
              {colorStr}
            </span>
          </React.Fragment>
        );
      }

      return s;
    });
  }

  return title;
};
