import React from 'react';
import '../askQuestion.css';

const AskQuestion = ({ hidden, handleViewSwitch, name }) => {
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      handleViewSwitch(event);
    }
  });
  if (hidden) {
    return (
      <div></div>
    );
  }
  return (
  <div>
    <div className="popup-background" id="exit-popup" onClick={handleViewSwitch} role="button" />
    <div className="popup">
      <div id="qa-icon"></div>
      <div>Ask a question</div>
      <div>Get quick answers from {name} staff and past guests.</div>
      <textarea />
      <div>Note: your question will be posted publicly on the Questions & Answers page.</div>
      <div>Posting guidelines</div>
      <div>
        <input type="checkbox" />
        reCAPTCHA
        Privacy - Terms
      </div>
      <button onClick={handleViewSwitch} >Submit</button>
      <button onClick={handleViewSwitch} >Cancel</button>
    </div>
  </div>
  );
};

export default AskQuestion;