const getPopularMentions = (reviews) => {
  const reviewBodies = reviews.map((review) => review.body);
  const combinedText = reviewBodies.join(' ');
  const words = combinedText.split(' ');

  const wordCounts = words.reduce((counts, word) => {
    word in counts ? counts[word] += 1 : counts[word] = 1; // eslint-disable-line
    return counts;
  }, {});

  const popularMentions = [];
  for (const word in wordCounts) { // eslint-disable-line
    if (wordCounts[word] > reviews.length * 0.15) {
      if (popularMentions.join(' ').indexOf(word) === -1) {
        if ('all reviews'.indexOf(word) === -1) {
          popularMentions.push(word);
        }
      }
    }
  }

  popularMentions.sort((wordA, wordB) => {
    if (wordA[1] > wordB[1]) {
      return -1;
    }
    if (wordA[1] < wordB[1]) {
      return 1;
    }
    return 0;
  });

  popularMentions.unshift('All reviews');

  return popularMentions;
};

export default getPopularMentions;
