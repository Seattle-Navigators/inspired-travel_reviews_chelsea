import React from 'react';
import { string } from 'prop-types';

const ListItem = ({ value, type, records }) => (
  <div>
    <input type={type} id={`${type}-${value}`} value={`${type}-${value}`} />{value} {records}
  </div>
);

export default ListItem;

ListItem.propTypes = {
  value: string.isRequired,
  type: string.isRequired,
};
