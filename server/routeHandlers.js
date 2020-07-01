const Review = require('../database/Reviews.js');

module.exports.findForId = (req, res, testCb = () => {}) => {
  Review.find({ attractionId: req.params.productId }, null, { sort: '-createdAt' }, (err, docs) => {
    if (err) {
      res.sendStatus(500);
      testCb(err, 500);
    } else if (docs.length === 0) {
      res.sendStatus(404);
      testCb('not found', 404);
    } else {
      res.status(200);
      res.json(docs);
      testCb(null, docs, 200);
    }
  });
};

module.exports.updateReview = (req, res, testCb = () => {}) => {
  Review.findOne({ _id: req.params.reviewId }, (err, doc) => {
    if (err) {
      res.sendStatus(404);
      testCb(err, 404);
    } else {
      doc.helpful = !doc.helpful; // eslint-disable-line no-param-reassign
      doc.save()
        .then(() => {
          res.sendStatus(200);
          testCb(null, 200);
        })
        .catch((saveErr) => {
          res.sendStatus(500);
          testCb(saveErr, 500);
        });
    }
  });
};

module.exports.updateImage = (req, res, testCb = () => {}) => {
  Review.collection.updateOne({
    'uploadImages.id': req.params.imageId,
  }, {
    $set: { 'uploadImages.$.helpful': true },
  })
    .then(() => {
      res.sendStatus(200);
      testCb(null, 200);
    })
    .catch((err) => {
      res.sendStatus(404);
      testCb(err, 404);
    });
};
