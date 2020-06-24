import React from 'react';
import { string, func } from 'prop-types';

const Header = ({
  id,
  header,
  buttonLabel,
  subtitle,
  buttonId,
  handleSelection,
}) => (
  <div className="header" id={id}>
    <div>
      <div>{header}</div>
      <div>{subtitle}</div>
    </div>
    <div>
      <button id={buttonId} type="button" className="header-button" onClick={handleSelection} value={buttonLabel}>
        {buttonLabel}
      </button>
      <select className="dropdown" onChange={handleSelection} >
        <option hidden></option>
        <option value="write-review">Write a review</option>
        <option value="post-photo">Post a photo</option>
        <option value="ask-question">Ask a question</option>
      </select>
    </div>
  </div>
);

Header.propTypes = {
  id: string.isRequired,
  header: string.isRequired,
  subtitle: string.isRequired,
  buttonId: string.isRequired,
  buttonLabel: string.isRequired,
  handleSelection: func.isRequired,
};

export default Header;
