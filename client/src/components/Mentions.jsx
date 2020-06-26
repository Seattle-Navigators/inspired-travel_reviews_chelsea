import React from 'react';
import { arrayOf, string, func } from 'prop-types';
import MentionBtn from './MentionBtn.jsx';

const Mentions = ({ keywords, handleSearch, search }) => {
  return (
    <div id="popular-mentions">
      <div>Popular Mentions</div>

      {keywords.map((keyword) => {
        let id = keyword;
        let className = "mention-off";
        if (keyword === 'All reviews') {
          id = 'allReviews';
          className = "mention-on"
        }
        if (search.indexOf(keyword) > -1) {
          className = "mention-on"
        }
        return (
          <MentionBtn
            id={`${id}-filter`}
            label={keyword}
            key={id}
            className={className}
            handleSearch={handleSearch}
          />
        );
      })}

    </div>
  );
};

Mentions.propTypes = {
  keywords: arrayOf(string),
  handleSearch: func.isRequired,
  search: string.isRequired,
}

export default Mentions;
