/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const ReviewController = require(APP_CONTROLLER_PATH + 'review');
let reviewController = new ReviewController();

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.get);
router.post('/', reviewController.create);
router.delete('/:id', reviewController.remove);
router.put('/:id', reviewController.update);
router.get('/store/:id', reviewController.getStoreReviews);
router.get('/user/:id', reviewController.getUserReviews);
// router.post('/report/', reviewController.createReportReview);

module.exports = router;