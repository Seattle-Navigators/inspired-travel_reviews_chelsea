import React from 'react';
import { string, number } from 'prop-types';

const Tab = ({
  id,
  icon,
  title,
  records,
}) => (
  <div className="tab" id={id}>
    <div className="tab-line">{icon}</div>
    <div className="tab-line">{records}</div>
    <div className="tab-line">{title}</div>
  </div>
);

Tab.propTypes = {
  id: string.isRequired,
  icon: string.isRequired,
  title: string.isRequired,
  records: number.isRequired,
};

export default Tab;
