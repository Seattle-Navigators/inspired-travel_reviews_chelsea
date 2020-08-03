import { textHasAllSearchWords } from './textHasAllSearchWords';

export const applyFilters = ({view, numReviews, reviews, filters, search, currentPage }) => {
  let rateFiltersAreOn = false;
  let typeFiltersAreOn = false;
  let timeFiltersAreOn = false;

  const rateFilters = ['excellent', 'veryGood', 'average', 'poor', 'terrible'];
  const typeFilters = ['family', 'couple', 'solo', 'business', 'friends'];
  const timeFilters = ['decFeb', 'marMay', 'junAug', 'sepNov'];

  for (const filter in filters) { // eslint-disable-line
    if (rateFilters.indexOf(filter) > -1) {
      if (filters[filter]) {
        rateFiltersAreOn = true;
      }
    }
    if (typeFilters.indexOf(filter) > -1) {
      if (filters[filter]) {
        typeFiltersAreOn = true;
      }
    }
    if (timeFilters.indexOf(filter) > -1) {
      if (filters[filter]) {
        timeFiltersAreOn = true;
      }
    }
  }

  const mapToFilter = {
    4: 'excellent',
    3: 'veryGood',
    2: 'average',
    1: 'poor',
    0: 'terrible',
    Family: 'family',
    Couple: 'couple',
    Solo: 'solo',
    Business: 'business',
    Friends: 'friends',
    m0: 'decFeb',
    m1: 'decFeb',
    m2: 'marMay',
    m3: 'marMay',
    m4: 'marMay',
    m5: 'junAug',
    m6: 'junAug',
    m7: 'junAug',
    m8: 'sepNov',
    m9: 'sepNov',
    m10: 'sepNov',
    m11: 'decFeb',
  };

  const filteredReviews = reviews.filter(({ rating, travelType, expDate, lang, title, body }) => {

    const reviewWords = body.toLowerCase().split(' ').concat(title.toLowerCase().split(' '));
    const trimEndSpaces = /\s+$/;
    const trimStartSpaces = /^\s+/;
    const trimExtraSpaces = /\s{2,}/g;
    const trimmedEnd = search.replace(trimEndSpaces, '');
    const trimmedStart = trimmedEnd.replace(trimStartSpaces, '');
    const trimmedExtra = trimmedStart.replace(trimExtraSpaces, ' ');
    const cleanedSearch = trimmedExtra.toLowerCase().split(' ');

    if (filters[mapToFilter[rating]] || !rateFiltersAreOn) {
      if (filters[mapToFilter[travelType]] || !typeFiltersAreOn) {
        if (filters[mapToFilter[`m${new Date(expDate).getMonth()}`]] || !timeFiltersAreOn) {
          if (filters.language === lang || filters.language === 'All languages') {
            if (textHasAllSearchWords(reviewWords, cleanedSearch) || search === 'All reviews') {
              return true;
            }
          }
        }
      }
    }
    return false;
  });

  return filteredReviews;
};
