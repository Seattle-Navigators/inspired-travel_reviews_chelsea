import { contains } from 'underscore';

export const textHasAllSearchWords = (textWords, searchWords) => {
  let containsSearch = true;
  searchWords.forEach((searchWord) => {
    if (!contains(textWords, searchWord)) {
      containsSearch = false;
    }
  });
  return containsSearch;
};
