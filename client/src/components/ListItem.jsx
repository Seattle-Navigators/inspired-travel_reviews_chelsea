import React from 'react';
import { string } from 'prop-types';

const ListItem = ({ value, type, records, name, handleFilter }) => (
  <div>
    <input type={type} name={name} id={`${type}-${value}`} value={`${type}-${value}`} onChange={handleFilter} />{value} {records}
  </div>
);

export default ListItem;

ListItem.propTypes = {
  value: string.isRequired,
  type: string.isRequired,
};
