import React from 'react';
import { string, number, func } from 'prop-types';

const Tab = ({
  baseId,
  title,
  records,
  handleViewSwitch,
}) => (
  <div className="tab" id={`${baseId}-tab`} onClick={handleViewSwitch}>
    <div className="tab-line" id={`${baseId}-icon`}></div>
    <div className="tab-line" id={`${baseId}-num`}>{records}</div>
    <div className="tab-line" id={`${baseId}-title`}>{title}</div>
  </div>
);

Tab.propTypes = {
  baseId: string.isRequired,
  title: string.isRequired,
  records: number.isRequired,
  handleViewSwitch: func.isRequired,
};

export default Tab;
