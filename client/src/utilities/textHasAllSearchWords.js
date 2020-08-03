import { contains } from 'underscore';

const textHasAllSearchWords = (textWords, searchWords) => {
  let containsSearch = true;
  searchWords.forEach((searchWord) => {
    if (!contains(textWords, searchWord)) {
      containsSearch = false;
    }
  });
  return containsSearch;
};

export default textHasAllSearchWords;
