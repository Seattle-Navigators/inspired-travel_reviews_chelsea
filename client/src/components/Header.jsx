import React from 'react';

const Header = ({
  id,
  header,
  buttonLabel,
  subtitle,
  buttonId,
}) => (
  <div id={id}>
    <div>{header}</div>
    <div>{subtitle}</div>
    <button id={buttonId} type="button">{buttonLabel}</button>
  </div>
);

export default Header;
