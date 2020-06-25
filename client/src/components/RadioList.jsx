import React from 'react';
import { string } from 'prop-types';

const RadioList = ({ title }) => (
  <div className="checklist-filter">
    <div className="filter-header">{title}</div>
    <input type="radio" />
    <input type="radio" />
    <input type="radio" />
    <input type="radio" />
    <input type="radio" />
  </div>
);

RadioList.propTypes = {
  title: string.isRequired,
};

export default RadioList;
