module.exports.generateTestData = (attractionId, dummyIdNeeded) => {
  const testReviews = [];
  for (let i = 0; i < 5; i += 1) {
    const review = {
      user: {
        originCountry: 'United States',
        originRegion: 'Oregon',
        contributions: 999,
        name: 'Joe Bob',
        profileImage: 'https://fec-images-6-18-20.s3-us-west-2.amazonaws.com/profiles/img1.jpg',
      },
      uploadImages: [
        {
          id: `${attractionId}1${i}`,
          helpful: false,
          url: 'https://fec-images-6-18-20.s3-us-west-2.amazonaws.com/userUploads/img19.jpg',
          username: 'joeB',
          createdAt: new Date(),
          reviewTitle: 'What a great place this was',
          reviewRating: i,
        },
      ],
      attractionId,
      attractionName: 'Hawaii',
      rating: i,
      travelType: 'Solo',
      expDate: '2019-09-27T06:08:15.712Z',
      lang: 'English',
      body: 'Like I said a great place',
      title: 'What a great place this was',
      votes: 999,
      createdAt: new Date(),
      helpful: false,
    };
    if (dummyIdNeeded) {
      review._id = `test${i}`; // eslint-disable-line
    }
    testReviews.push(review);
  }
  return testReviews;
};
