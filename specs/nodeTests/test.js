/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { findForId, updateReview, updateImage } = require('../../server/routeHandlers.js');
const Review = require('../../database/Reviews.js');
const { generateTestData } = require('./testData.js');

const attractionId = '200'; // okay to use any id above 100 for testing
const mockRes = {
  status: () => {},
  json: () => {},
  send: () => {},
  sendStatus: () => {},
};

describe('Server route handlers interact as expected with database', () => {
  beforeAll(() => {
    const testReviews = generateTestData(attractionId);
    return Review.create(testReviews);
  });

  afterAll(() => {
    Review.deleteMany({ attractionId })
      .then(() => {
        mongoose.connection.close();
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
    Review.find({ attractionId }, (err, docs) => {
      const reviewId = docs[0]._id; // eslint-disable-line no-underscore-dangle
      updateReview({ params: { reviewId } }, mockRes, (err) => {
        expect(err).toBe(null);
        Review.findOne({ _id: reviewId }, (err, doc) => {
          expect(doc.helpful).toBe(true);
          done();
        });
      });
    });
  });

  test('updateImage changes a single image\'s "helpful" property to true', (done) => {
    Review.find({ attractionId }, (err, docs) => {
      const imageId = docs[0].uploadImages[0].get('id');
      updateImage({ params: { imageId } }, mockRes, (err) => {
        expect(err).toBe(null);
        Review.findOne({ 'uploadImages.id': imageId }, (err, doc) => {
          expect(doc.uploadImages[0].get('helpful')).toBe(true);
          done();
        });
      });
    });
  });
});
