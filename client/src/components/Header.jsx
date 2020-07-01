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
  <div className="reviews-header" id={id}>
    <div>
      <div>{header}</div>
      <div id="subtitle">{subtitle}</div>
    </div>
    <div>
      <button id={buttonId} type="button" className="header-button" onClick={handleSelection} value={buttonLabel}>
        {buttonLabel}
      </button>
      <select className="dropdown" onChange={handleSelection} multiple={false} value="hidden">
        <option hidden value="hidden" aria-label="hidden" />
        <option id="off-page-write" value="write-review">Write a review</option>
        <option id="off-page-photo" value="post-photo">Post a photo</option>
        <option id="ask-question-option" value="ask-question">Ask a question</option>
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
