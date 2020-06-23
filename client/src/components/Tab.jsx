import React from 'react';
import { string, number } from 'prop-types';

const Tab = ({
  id,
  title,
  records,
}) => (
  <div className="tab">
    <div className="tab-line" id={id}></div>
    <div className="tab-line">{records}</div>
    <div className="tab-line">{title}</div>
  </div>
);

Tab.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  records: number.isRequired,
};

export default Tab;
