import React from 'react';
import { arrayOf, string, func } from 'prop-types';
import MentionBtn from './MentionBtn.jsx';

const Mentions = ({ keywords, handleMention, search }) => {

  return (
    <div id="popular-mentions">
      <div>Popular Mentions</div>

      {keywords.map((keyword) => {
        let id;
        keyword === 'All reviews' ? id = 'allReviews' : id = keyword;

        let className = "mention-off";

        if (search.indexOf(keyword) > -1) {
          className = "mention-on"
        }
        return (
          <MentionBtn
            id={`${id}-filter`}
            label={keyword}
            key={id}
            className={className}
            handleMention={handleMention}
          />
        );
      })}

    </div>
  );
};

Mentions.propTypes = {
  keywords: arrayOf(string),
  handleMention: func.isRequired,
  search: string.isRequired,
}

export default Mentions;
