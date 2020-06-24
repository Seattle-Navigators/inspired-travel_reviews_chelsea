import React from 'react';
import { string } from 'prop-types';

const RadioList = ({ title }) => (
  <div className="filter">
    <div className="filter-header">{title}</div>
  </div>
);

RadioList.propTypes = {
  title: string.isRequired,
};

export default RadioList;
