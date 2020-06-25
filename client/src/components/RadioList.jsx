import React from 'react';
import { string } from 'prop-types';
import ListItem from './ListItem';

const RadioList = ({ title, labels }) => (
  <div className="checklist-filter">
    <div className="filter-header">{title}</div>
    {labels.map((label) => <ListItem value={label} type="radio" key={`${label}-label`}/>)}
  </div>
);

RadioList.propTypes = {
  title: string.isRequired,
};

export default RadioList;
