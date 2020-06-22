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
  Review.findOne({ _id: req.params.reviewId }, (err, doc) => {
    if (err) {
      res.sendStatus(500);
      testCb(err);
    } else {
      console.log('reviewId searched: ', req.params.reviewId);
      console.log('doc returned from search: ', doc);
      doc.helpful = true;
      doc.save()
        .then((doc) => {
          res.sendStatus(200);
          testCb(null, doc);
        })
        .catch((err) => {
          res.sendStatus(500);
          testCb(err);
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
      res.sendStatus(200);
      testCb(null, data);
    })
    .catch((err) => {
      res.sendStatus(500);
      testCb(err);
    });
};
