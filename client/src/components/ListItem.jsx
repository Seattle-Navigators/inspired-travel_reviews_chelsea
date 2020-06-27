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

  let toggleLang = value;
  if (value === 'All languages') {
    toggleLang = 'AllLanguages';
  }

  let toggleRecords = records;
  if (records) {
    toggleRecords = `(${records})`;
  }

  return (
    <div className="list-item">
      <input
        type={type}
        name={name}
        id={`${type}-${toggleLang}`}
        value={`${type}-${toggleLang}`}
        onChange={changeFunction}
        checked={selected}
        className={`${type}`}
      />
      {value}
      <span className="spacer" />
      <span className="lang-num">{toggleRecords}</span>
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
