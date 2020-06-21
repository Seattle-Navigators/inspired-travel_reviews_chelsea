const Review = require('../database/Reviews.js');

module.exports.findForId = (req, res, testCb = () => {}) => {
  Review.find({ attractionId: req.params.productId }, (err, docs) => {
    if (err) {
      res.sendStatus(500);
      testCb(err);
    } else {
      res.status(200);
      res.json(docs);
      testCb(null, docs);
    }
  });
};

module.exports.updateReview = (req, res, testCb = () => {}) => {
  Review.updateOne({ _id: req.params.reviewId }, { helpful: true }, (err, data) => {
    if (err) {
      res.sendStatus(500);
      testCb(err);
    } else {
      res.sendStatus(200);
      testCb(null, data);
    }
  });
};

module.exports.updateImage = (req, res, testCb = () => {}) => {
  Review.collection.updateOne({
    'uploadImages.id': req.params.imageId,
  }, {
    $set: { 'uploadImages.$.helpful': true },
  })
    .then((data) => {
      res.sendStatus(200);
      testCb(null, data);
    })
    .catch((err) => {
      res.sendStatus(500);
      testCb(err);
    });
};
