import App from '../client/src/components/App.jsx';
const { findForId, updateReview, updateImage } = require('../server/routeHandlers.js');
const Review = require('../database/Reviews.js');

const attractionId = '200'; // okay to use any id above 100 for testing
const mockRes = {
  status: () => {},
  json: () => {},
  send: () => {},
  sendStatus: () => {},
};
let reviewId;
let imageId;

beforeAll(() => {
  const testReviews = [];
  for (let i = 0; i < 5; i++) {
    testReviews.push({
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
          reviewRating: 3,
        },
      ],
      attractionId,
      rating: 3,
      travelType: 'Solo',
      expDate: new Date(),
      lang: 'English',
      body: 'Like I said, a great place',
      title: 'What a great place this was',
      votes: 999,
      createdAt: new Date(),
      helpful: false,
    });
  }
  return Review.create(testReviews)
    .then(() => {
      Review.find({ attractionId }, (err, docs) => {
        reviewId = docs[0]._id;
        imageId = docs[0].uploadImages[0].get('id');
        return;
      });
    });
});

afterAll(() => {
  return Review.deleteMany({ attractionId })
    .then(() => {
      return;
    });
});

test('findForId finds all reviews for a given attraction ID', (done) => {
  findForId({ params: { productId: attractionId } }, mockRes, (err, docs) => {
    expect(err).toBe(null);
    expect(docs.length).toEqual(5);
    done();
  });
});

test('updateReview changes a single review\'s "helpful" property to true', (done) => {
  updateReview({ params: { reviewId } }, mockRes, (err, data) => {
    expect(err).toBe(null);
    Review.findOne({ _id: reviewId }, (err, doc) => {
      expect(doc.helpful).toBe(true);
      done();
    });
  });
});

test('updateImage changes a single image\'s "helpful" property to true', (done) => {
  updateImage({ params: { imageId } }, mockRes, (err, data) => {
    expect(err).toBe(null);
    Review.findOne({ 'uploadImages.id': imageId }, (err, doc) => {
      expect(doc.uploadImages[0].get('helpful')).toBe(true);
      done();
    });
  });
});

test('App is a function', (done) => {
  expect(typeof App).toEqual('function');
  done();
});
