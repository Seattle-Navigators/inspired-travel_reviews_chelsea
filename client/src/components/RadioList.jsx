import React from 'react';
import { string, arrayOf, func } from 'prop-types';
import ListItem from './ListItem';

const RadioList = ({ title, labels, handleSelection, langs, handleFilter }) => {
  const displayed = langs.slice(0, 4);
  return (
    <div className="checklist-filter">
      <div className="filter-header">{title}</div>

      {displayed.map((lang) => <ListItem value={lang[0]} name="small-langs" records={lang[1]} type="radio" key={`${lang}-label`} handleFilter={handleFilter} />)}

      <button id="lang-btn" type="button" onClick={handleSelection} value="more-langs">
        More
      </button>
    </div>
  );
};

RadioList.propTypes = {
  title: string.isRequired,
  labels: arrayOf(string).isRequired,
  handleSelection: func.isRequired,
};

export default RadioList;
