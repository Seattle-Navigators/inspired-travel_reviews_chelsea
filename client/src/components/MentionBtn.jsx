import React from 'react';
import { string, func } from 'prop-types';

const MentionBtn = ({ id, label, className, handleSearch }) => {
  return (
    <button id={id} type="button" className={className} onClick={handleSearch} value={label}>
      {label}
    </button>
  );
};

MentionBtn.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  className: string.isRequired,
  handleSearch: func.isRequired,
};

export default MentionBtn;
