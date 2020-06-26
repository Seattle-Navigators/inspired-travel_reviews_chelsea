import React from 'react';
import { func, string } from 'prop-types';

const Search = ({ handleSearch, search }) => {
  if (search === 'All reviews') {
    search = 'Search reviews';
  }
  return (
    <div className="search">
      Search
      <input type="text" onChange={handleSearch} value={search} />
    </div>
  );
};

Search.propTypes = {
  handleSearch: func.isRequired,
  search: string.isRequired,
}

export default Search;

