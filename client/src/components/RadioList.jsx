import React from 'react';
import { string, arrayOf, func } from 'prop-types';
import ListItem from './ListItem';

const RadioList = ({ title, labels, handleSelection }) => {
  const displayed = labels.slice(0, 4);
  return (
    <div className="checklist-filter">
      <div className="filter-header">{title}</div>
      {displayed.map((label) => <ListItem value={label} type="radio" key={`${label}-label`}/>)}
      <button id="lang-btn" type="button" onClick={handleSelection} value="more-langs">
        More
      </button>
    </div>
  )
};

RadioList.propTypes = {
  title: string.isRequired,
  labels: arrayOf(string).isRequired,
  handleSelection: func.isRequired,
};

export default RadioList;
