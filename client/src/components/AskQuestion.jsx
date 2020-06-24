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
      <div>Get quick answers from {name} staff and past guests.</div>
    </div>
  </div>
  );
};

export default AskQuestion;