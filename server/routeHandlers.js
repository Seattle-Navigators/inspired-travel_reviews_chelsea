const Review = require('../database/Reviews.js');

module.exports.findForId = (req, res) => {
  Review.find({ attractionId: req.params.productId }, (err, docs) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(docs);
    }
  });
};

module.exports.updateReview = (req, res) => {
  Review.updateOne({ _id: req.params.reviewId }, { helpful: true }, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('reviewpatch');
      res.sendStatus(200);
    }
  });
};

module.exports.updateImage = (req, res) => {
  Review.collection.updateOne({
    'uploadImages.id': req.params.imageId,
  }, {
    $set: { 'uploadImages.$.helpful': true },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
