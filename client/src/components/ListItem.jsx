import React from 'react';
import { string } from 'prop-types';

const ListItem = ({ value }) => (
  <div>
    <input type="checkbox" id={`checkbox-${value}`} value={`checkbox-${value}`} />{value}
  </div>
);

export default ListItem;

ListItem.propTypes = {
  value: string.isRequired,
};
