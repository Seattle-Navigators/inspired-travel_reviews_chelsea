import React from 'react';
import { string } from 'prop-types';

const MentionBtn = ({ id, label, className }) => {
  return (
    <button id={id} type="button" className={className}>
      {label}
    </button>
  );
};

MentionBtn.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  className: string.isRequired,
};

export default MentionBtn;
