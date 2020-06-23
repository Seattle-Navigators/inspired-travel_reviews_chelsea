import React from 'react';

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

export default Tab;
