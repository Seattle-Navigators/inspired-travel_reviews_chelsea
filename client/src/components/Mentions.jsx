import React from 'react';
import { arrayOf, string, func } from 'prop-types';
import MentionBtn from './MentionBtn';

const Mentions = ({ keywords, handleMention, search }) => (
  <div id="popular-mentions">
    <div>Popular Mentions</div>

    {keywords.map((keyword) => {
      let mentionId;
      keyword === 'All reviews' ? mentionId = 'allReviews' : mentionId = keyword; // eslint-disable-line

      let className = 'mention-off';

      if (search.indexOf(keyword) > -1) {
        className = 'mention-on';
      }
      return (
        <MentionBtn
          id={`${mentionId}-filter`}
          label={keyword}
          key={mentionId}
          className={className}
          handleMention={handleMention}
        />
      );
    })}

  </div>
);

Mentions.propTypes = {
  keywords: arrayOf(string).isRequired,
  handleMention: func.isRequired,
  search: string.isRequired,
};

export default Mentions;
