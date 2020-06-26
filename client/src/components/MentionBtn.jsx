import React from 'react';
import { string, func } from 'prop-types';

const MentionBtn = ({
  id,
  label,
  className,
  handleMention,
}) => (
  <button
    id={id}
    type="button"
    className={className}
    onClick={handleMention}
    value={label}
  >
    {label}
  </button>
);

MentionBtn.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  className: string.isRequired,
  handleMention: func.isRequired,
};

export default MentionBtn;
