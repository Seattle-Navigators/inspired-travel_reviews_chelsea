const Review = require('../database/Reviews.js');

module.exports.findForId = (req, res, testCb = () => {}) => {
  Review.find({ attractionId: req.params.productId }, null, { sort: '-createdAt' }, (err, docs) => {
    if (err) {
      res.sendStatus(500);
      testCb(err);
    } else if (!docs) {
      res.sendStatus(404);
      testCb('not found');
    } else {
      res.status(200);
      res.json(docs);
      testCb(null, docs);
    }
  });
};

module.exports.updateReview = (req, res, testCb = () => {}) => {
  Review.findOne({ _id: req.params.reviewId }, (err, doc) => {
    if (err) {
      res.sendStatus(500);
      testCb(err);
    } else if (!doc) {
      res.sendStatus(404);
      testCb('not found');
    } else {
      doc.helpful = true; // eslint-disable-line no-param-reassign
      doc.save()
        .then((modDoc) => {
          res.sendStatus(200);
          testCb(null, modDoc);
        })
        .catch((saveErr) => {
          res.sendStatus(500);
          testCb(saveErr);
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
    .then((data) => {
      if (!data) {
        res.sendStatus(404);
        testCb('not found');
      } else {
        res.sendStatus(200);
        testCb(null, data);
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      testCb(err);
    });
};
