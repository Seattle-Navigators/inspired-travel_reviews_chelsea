import React from 'react';
import { bool, func, objectOf, number } from 'prop-types';
import '../languages.css';
import ListItem from './ListItem';

const Languages = ({ hidden, handleViewSwitch, langs }) => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      handleViewSwitch(event);
    }
  });
  if (hidden) {
    return <div />;
  }

  const langsArray = [];
  for (const lang in langs) {
    const langArray = [];
    langArray.push(lang, langs[lang]);
  }

  return (
    <div>
      <div className="popup-lang-background" id="exit-lang-popup" onClick={handleViewSwitch} role="button" aria-label="Exit popup" onKeyDown={handleViewSwitch} tabIndex={-1} />
      <div className="popup-lang">
        {langsArray.map((lang) => <ListItem value={lang[0]} records={lang[1]} type="radio" key={`${lang}-label`} />)}
      </div>
    </div>
  );
};

Languages.propTypes = {
  hidden: bool.isRequired,
  handleViewSwitch: func.isRequired,
  langs: objectOf(number).isRequired,
};

export default Languages;