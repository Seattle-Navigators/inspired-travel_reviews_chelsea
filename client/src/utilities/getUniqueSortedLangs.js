const getUniqueSortedLangs = (reviews) => {
  const allLangs = reviews.map((review) => review.lang);
  const uniqueifier = {};

  allLangs.forEach((lang) => {
    if (lang in uniqueifier) {
      uniqueifier[lang] += 1;
    } else {
      uniqueifier[lang] = 1;
    }
  });

  const langsSummary = [];
  for (const lang in uniqueifier) { // eslint-disable-line
    const oneLang = [];
    oneLang.push(lang, uniqueifier[lang]);
    langsSummary.push(oneLang);
  }

  langsSummary.sort((langA, langB) => {
    if (langA[1] > langB[1]) {
      return -1;
    }
    if (langA[1] < langB[1]) {
      return 1;
    }
    return 0;
  });

  langsSummary.unshift(['All languages', null]);

  return langsSummary;
};

export default getUniqueSortedLangs;
