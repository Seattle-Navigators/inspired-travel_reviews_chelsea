import React from 'react';
import '../askQuestion.css';
import { bool, func, string } from 'prop-types';

const AskQuestion = ({
  hidden,
  handleViewSwitch,
  name,
  guideActive,
  handleReadMore,
}) => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      handleViewSwitch(event);
    }
  });
  if (hidden) {
    return <div />;
  }
  return (
    <div>
      <div
        className="popup-background"
        id="exit-popup"
        onClick={handleViewSwitch}
        role="button"
        aria-label="Exit popup"
        onKeyDown={handleViewSwitch}
        tabIndex={-1}
      />
      <div className="popup">
        <div className="qa-header-popup">
          <div id="qa-icon-popup" />
          <span className="qa-header-title-popup">Ask a question</span>
          <button id="exit-q" onClick={handleViewSwitch} type="button" onKeyDown={handleViewSwitch} tabIndex={-2}>X</button>
        </div>
        <div className="get-quick-answers">
          {`Get quick answers from ${name} staff and past guests.`}
        </div>
        <div className="qa-input-container">
          <div className="my-profile-image" />
          <textarea className="qa-textarea" placeholder="Hi, what would you like to know about this attraction?" />
        </div>
        <div className="qa-popup-footer">
          <div className="qa-note">Note: your question will be posted publicly on the Questions & Answers page.</div>
          <button type="button" id="guideline-area" onClick={handleReadMore} value="guideline-area">
            <div id="posting-guidelines-link">Posting guidelines</div>
            <div id="posting-guidelines-arrow" />
          </button>
          <ul hidden={!guideActive}>
            <li>{`Questions should be directly relevant to visiting ${name}`}</li>
            <li>
              If you have a customer service issue, please contact the business directly.
              For questions about visiting a destination, check out Tripadvisor Forums.
            </li>
            <li>Answers should be objective and to the point.</li>
            <li>Links, contact information, and advertising are not permitted.</li>
            <li>
              Questions and answers must adhere to our
              <a href="#">Questions and Answers Guidelines.</a> {/* eslint-disable-line */}
            </li>
          </ul>
          <div id="recaptcha" />
          <button id="submit-q" onClick={handleViewSwitch} type="button" onKeyDown={handleViewSwitch} tabIndex={-2}>Submit</button>
          <button id="cancel-q" onClick={handleViewSwitch} type="button" onKeyDown={handleViewSwitch} tabIndex={-3}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

AskQuestion.propTypes = {
  hidden: bool.isRequired,
  handleViewSwitch: func.isRequired,
  name: string.isRequired,
  guideActive: bool.isRequired,
  handleReadMore: func.isRequired,
};

export default AskQuestion;
