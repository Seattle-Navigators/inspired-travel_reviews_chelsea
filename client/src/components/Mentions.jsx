import React from 'react';
import { arrayOf, string } from 'prop-types';
import MentionBtn from './MentionBtn.jsx';

const Mentions = ({ keywords }) => {
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
        return (
          <MentionBtn id={`${id}-filter`} label={keyword} key={id} className={className} />
        );
      })}

    </div>
  );
};

Mentions.propTypes = {
  keywords: arrayOf(string),
}

export default Mentions;
