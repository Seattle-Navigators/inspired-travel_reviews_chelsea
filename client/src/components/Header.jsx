import React from 'react';

const Header = ({ id, header, buttonLabel, subtitle, buttonId }) => {
  return (
    <div id={id}>
      <span>{header}</span>
      <button id={buttonId}>{buttonLabel}</button>
    </div>
  );
};

export default Header;