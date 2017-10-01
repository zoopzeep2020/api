/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const ReviewCommentController = require(APP_CONTROLLER_PATH + 'reviewComment');
let reviewCommentController = new ReviewCommentController();

router.get('/', reviewCommentController.getAll);
router.get('/:id', reviewCommentController.get);
router.post('/', reviewCommentController.create);
router.delete('/:id', reviewCommentController.remove);
router.put('/:id', reviewCommentController.update);

module.exports = router;