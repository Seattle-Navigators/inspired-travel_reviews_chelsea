import React from 'react';
import { bool, func, arrayOf, array } from 'prop-types'; // eslint-disable-line
import '../languages.css';
import ListItem from './ListItem';

const Languages = ({ hidden, handleViewSwitch, langs, handleFilter }) => {
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
      <div className="popup-lang-background" id="exit-lang-popup" onClick={handleViewSwitch} role="button" aria-label="Exit popup" onKeyDown={handleViewSwitch} tabIndex={-1} />
      <div className="popup-lang">
        <button onClick={handleViewSwitch}>X</button>
        {langs.map((lang) => <ListItem value={lang[0]} records={lang[1]} type="radio" key={`${lang}-label`} name="expand-langs" handleFilter={handleFilter} />)}
      </div>
    </div>
  );
};

Languages.propTypes = {
  hidden: bool.isRequired,
  handleViewSwitch: func.isRequired,
  langs: arrayOf(array).isRequired,
};

export default Languages;
