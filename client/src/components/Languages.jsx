import React from 'react';
import { bool, func, arrayOf, array, string } from 'prop-types'; // eslint-disable-line
import '../languages.css';
import ListItem from './ListItem';

const Languages = ({
  hidden,
  handleViewSwitch,
  langs,
  handleFilter,
  selection,
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
      <div className="popup-lang-background" id="exit-lang-popup" onClick={handleViewSwitch} role="button" aria-label="Exit popup" onKeyDown={handleViewSwitch} tabIndex={-1} />
      <div className="popup-lang">
        <span className="lang-btn-container">
          <button onClick={handleViewSwitch} type="button">X</button>
        </span>
        {langs.map((lang) => {
          const selected = lang[0] === selection;
          return (
            <ListItem
              value={lang[0]}
              records={lang[1]}
              type="radio"
              key={`${lang}-label`}
              name="expand-langs"
              handleFilter={handleFilter}
              handleViewSwitch={handleViewSwitch}
              selected={selected}
            />
          );
        })}
      </div>
    </div>
  );
};

Languages.propTypes = {
  hidden: bool.isRequired,
  handleViewSwitch: func.isRequired,
  langs: arrayOf(array).isRequired,
  handleFilter: func.isRequired,
  selection: string.isRequired,
};

export default Languages;
