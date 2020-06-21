const { findForId, updateReview, updateImage } = require('../server/routeHandlers.js');

test('findForId is a function', () => {
  expect(typeof findForId).toBe('function');
});

test('updateReview is a function', () => {
  expect(typeof updateReview).toBe('function');
});

test('updateImage is a function', () => {
  expect(typeof updateImage).toBe('function');
});
