import React from 'react';
import '../askQuestion.css';
import { bool, func, string } from 'prop-types';

const AskQuestion = ({ hidden, handleViewSwitch, name }) => {
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
      <div className="popup-background" id="exit-popup" onClick={handleViewSwitch} role="button" aria-label="Exit popup" onKeyDown={handleViewSwitch} tabIndex={-1} />
      <div className="popup">
        <div id="qa-icon" />
        <div>Ask a question</div>
        <div>
          {`Get quick answers from ${name} staff and past guests.`}
        </div>
        <textarea placeholder="Hi, what would you like to know about this attraction?" />
        <div>Note: your question will be posted publicly on the Questions & Answers page.</div>
        <div>Posting guidelines</div>
        <div>
          <input type="checkbox" />
          reCAPTCHA
          Privacy - Terms
        </div>
        <button id="submit-q" onClick={handleViewSwitch} type="button" onKeyDown={handleViewSwitch} tabIndex={-2}>Submit</button>
        <button id="cancel-q" onClick={handleViewSwitch} type="button" onKeyDown={handleViewSwitch} tabIndex={-3}>Cancel</button>
      </div>
    </div>
  );
};

AskQuestion.propTypes = {
  hidden: bool.isRequired,
  handleViewSwitch: func.isRequired,
  name: string.isRequired,
};

export default AskQuestion;
