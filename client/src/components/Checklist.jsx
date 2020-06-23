import React from 'react';
import { string } from 'prop-types';

const Checklist = ({ title }) => (
  <div className="filter">
    <div className="filter-header">{title}</div>
  </div>
);

Checklist.propTypes = {
  title: string.isRequired,
};

export default Checklist;
