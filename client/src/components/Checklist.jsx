import React from 'react';
import { string, arrayOf } from 'prop-types';
import ListItem from './ListItem';

const Checklist = ({ title, labels, handleFilter }) => (
  <div className="checklist-filter" id={`checklist-${title}`}>
    <div className="filter-header">{title}</div>
    {labels.map((label) => <ListItem value={label} type="checkbox" key={`${label}-label`} handleFilter={handleFilter} />)}
  </div>
);

Checklist.propTypes = {
  title: string.isRequired,
  labels: arrayOf(string).isRequired,
};

export default Checklist;
