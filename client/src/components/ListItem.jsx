import React from 'react';
import { string } from 'prop-types';

const ListItem = ({ value, type }) => (
  <div>
    <input type={type} id={`${type}-${value}`} value={`${type}-${value}`} />{value}
  </div>
);

export default ListItem;

ListItem.propTypes = {
  value: string.isRequired,
  type: string.isRequired,
};
