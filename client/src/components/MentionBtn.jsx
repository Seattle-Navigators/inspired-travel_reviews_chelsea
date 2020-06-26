import React from 'react';
import { string } from 'prop-types';

const MentionBtn = ({ id, label }) => {
  return (
    <button id={id} type="button">
      {label}
    </button>
  );
};

MentionBtn.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
};

export default MentionBtn;
