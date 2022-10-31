import * as React from 'react';
type Props = {
  onSearch: Function;
};
const SearchUsers: React.FC<Props> = ({ onSearch }) => {
  return (
    <div>
      <input
        onChange={(event: any) => onSearch(event.target.value)}
        className="filter-search"
        data-cy="filter-search"
      />
    </div>
  );
};

export default SearchUsers;
