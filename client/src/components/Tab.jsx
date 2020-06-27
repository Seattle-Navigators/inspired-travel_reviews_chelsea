import React from 'react';
import { string, number, func } from 'prop-types';

const Tab = ({
  baseId,
  title,
  records,
  handleViewSwitch,
  activeView,
}) => {
  let toggleActive = 'inactive';
  if ((activeView === 'Reviews' && baseId === 'review') || (activeView === 'Questions' && baseId === 'qa')) {
    toggleActive = 'active';
  }
  return (
    <div className={`tab ${toggleActive}-tab`} id={`${baseId}-tab`} onClick={handleViewSwitch} onKeyDown={handleViewSwitch} role="button" tabIndex={0}>
      <div className="tab-icon" id={`${baseId}-icon`} />
      <div className="tab-num" id={`${baseId}-num`}>{records}</div>
      <div className={`tab-title ${toggleActive}-title`} id={`${baseId}-title`}>{title}</div>
    </div>
  );
};

Tab.propTypes = {
  baseId: string.isRequired,
  title: string.isRequired,
  records: number.isRequired,
  handleViewSwitch: func.isRequired,
  activeView: string.isRequired,
};

export default Tab;
