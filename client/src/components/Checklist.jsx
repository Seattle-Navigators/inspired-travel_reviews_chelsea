import React from 'react';
import { string, arrayOf, func, objectOf, bool, oneOfType } from 'prop-types'; // eslint-disable-line
import ListItem from './ListItem';

const Checklist = ({ title, labels, handleFilter, selections }) => (
  <div className="checklist-filter" id={`checklist-${title}`}>
    <div className="filter-header">{title}</div>
    {labels.map((label) => {
      const mapToFilter = {
        'Families': 'family',
        'Couples': 'couple',
        'Solo': 'solo',
        'Business': 'business',
        'Friends': 'friends',
        'Dec-Feb': 'decFeb',
        'Mar-May': 'marMay',
        'Jun-Aug': 'junAug',
        'Sep-Nov': 'sepNov',
      };

      return (
        <ListItem
          value={label}
          type="checkbox"
          key={`${label}-label`}
          handleFilter={handleFilter}
          selected={selections[mapToFilter[label]]}
        />
      );
    })}
  </div>
);

Checklist.propTypes = {
  title: string.isRequired,
  labels: arrayOf(string).isRequired,
  handleFilter: func.isRequired,
  selections: objectOf(oneOfType([string, bool])).isRequired,
};

export default Checklist;
