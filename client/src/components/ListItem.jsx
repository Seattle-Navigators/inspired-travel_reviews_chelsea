import React from 'react';
import { string, number, func, bool, any } from 'prop-types'; // eslint-disable-line

const ListItem = ({
  value,
  type,
  records,
  name,
  handleFilter,
  handleViewSwitch,
  selected,
}) => {
  let changeFunction;
  if (handleViewSwitch) {
    changeFunction = (event) => {
      event.persist();
      handleFilter(event, () => { handleViewSwitch(event); });
    };
  } else {
    changeFunction = handleFilter;
  }

  if (value === 'All languages') {
    value = 'AllLanguages'; // eslint-disable-line
  }

  return (
    <div className="list-item">
      <input
        type={type}
        name={name}
        id={`${type}-${value}`}
        value={`${type}-${value}`}
        onChange={changeFunction}
        checked={selected}
        className={`${type}`}
      />
      {value}
      {records}
    </div>
  );
};

export default ListItem;

ListItem.propTypes = {
  value: string.isRequired,
  type: string.isRequired,
  records: number,
  name: string,
  handleFilter: func.isRequired,
  handleViewSwitch: func,
  selected: bool.isRequired,
};

ListItem.defaultProps = {
  handleViewSwitch: undefined,
  records: undefined,
  name: undefined,
};
