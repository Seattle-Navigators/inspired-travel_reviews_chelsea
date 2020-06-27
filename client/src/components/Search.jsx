import React from 'react';
import { func, string } from 'prop-types';

const Search = ({ handleChange, search }) => {
  if (search === 'All reviews') {
    search = ''; // eslint-disable-line
  }
  return (
    <div className="search">
      <div id="search-icon" />
      <input id="search-input" type="text" onChange={handleChange} value={search} placeholder="Search reviews" />
      <button id="clear-search" onClick={handleChange}>X</button>
    </div>
  );
};

Search.propTypes = {
  handleChange: func.isRequired,
  search: string.isRequired,
};

export default Search;
